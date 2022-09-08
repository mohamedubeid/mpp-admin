const db = require('../db/db.js');

class BannersService {
    // lifestle Categories

    async createBanner(
        title,
        advertize_url,
        banner_image,
        type,
        is_active,
        language_id,
        user_id
    ) {
        await db('tbl_advertize').insert({
            title,
            advertize_url,
            image_path: banner_image,
            advertize_type: type,
            is_active,
            created_date_time: new Date(),
            language_id,
        });

        let post = await db('tbl_advertize')
            .where({
                title,
                advertize_url,
                image_path: banner_image,
                advertize_type: type,
                is_active,
            })
            .first();

        return post;
    }

    async editBanner(
        id,
        title,
        advertize_url,
        banner_image,
        type,
        is_active,
        language_id,
        user_id
    ) {
        await db('tbl_advertize').where({ id }).update({
            title,
            advertize_url,
            image_path: banner_image,
            advertize_type: type,
            is_active,
            language_id,
        });
    }

    async deleteBanner(id) {
        await db('tbl_advertize').where({ id }).del();
    }

    async getBanners(limit, page, language_id, is_active) {
        let banners;
        if (is_active == 'all') {
            banners = await db('tbl_advertize')
                .where({ language_id })
                .orderBy('id', 'desc')
                .limit(limit)
                .offset((page - 1) * limit);
        } else {
            banners = await db('tbl_advertize')
                .where({ language_id, is_active })
                .orderBy('id', 'desc')
                .limit(limit)
                .offset((page - 1) * limit);
        }

        return banners;
    }

    async getBanner(id) {
        const post = await db('tbl_advertize').where({ id }).first();

        return post;
    }

    async getBannersCount(language_id, is_active) {
        let banners = await db('tbl_advertize')
            .where({ language_id })
            .count('id as count')
            .modify(function (queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            });

        return banners[0].count;
    }

    async getSelectedPost(language_id) {
        const posts = await db('tbl_advertize')
            .where({
                is_selected: '1',
                language_id,
            })
            .orderBy('id', 'desc');
        return posts;
    }

    async getLastCreatedPost(language_id, limit) {
        const posts = await db('tbl_advertize')
            .where({
                language_id,
                is_selected: '0',
            })
            .limit(limit)
            .orderBy('created_date_time', 'desc');
        return posts;
    }

    async clearSelected(language_id) {
        const response = await db('tbl_advertize')
            .where({ is_selected: '1', language_id })
            .update({
                is_selected: '0',
            });
        return response;
    }

    async selectPosts(selectedIds) {
        const response = await db('tbl_advertize')
            .whereIn('id', selectedIds)
            .update({
                is_selected: '1',
            });
        return response;
    }
}

module.exports = new BannersService();
