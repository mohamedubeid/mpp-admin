const db = require('../db/db.js');

class TvService {
    // Tv Categories

    async createCategory (title, description, slug, meta_title, meta_description, meta_keywords, is_active, categories_length, language_id, user_id) {
        await db('tbl_tv_category').insert({
            sub_title: "",
            parent_id: 0,
            category_image: "",
            category_order: categories_length,
            created_date: new Date(),
            deleted_date_time: new Date(),
            banner_image: "",
            title, 
            description, 
            url_slug: slug, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })
    }

    async editCategory (id, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user_id) {
        await db('tbl_tv_category')
        .where({id})
        .update({
            title, 
            description, 
            url_slug: slug, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })
    }

    async deleteCategory (id) {
        await db('tbl_tv_category')
            .where({id})
            .del();
    }

    async getCategories (limit, page, language_id, is_active) {
        let categories;

        categories = await db('tbl_tv_category').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return categories;
    }

    async getCategory (id) {
        const category = await db('tbl_tv_category').where({id}).first();

        return category;
    }

    async getCategoryWithSlug (slug) {
        const category = await db('tbl_tv_category').where({url_slug: slug}).first();

        return category;
    }

    async getCategoriesCount (language_id, is_active) {
        const categoriesCount = await db('tbl_tv_category').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return categoriesCount[0].count;
    }

    // Tv Videos

    async createVideo (title, video, slug, banner_image, meta_title, meta_description, meta_tags, is_active, language_id, user_id) {
        await db('tbl_tv_directory').insert({ 
            section_id: 0,
            classifed_modal: "",
            amount: 0,
            target_date: new Date(),
            created_date_time: new Date(),
            last_updated_ip: "",
            city_id: 0,
            classified_locality: "",
            classified_city_distance: 0,
            deleted_by: 0,
            age_group_id: 0,
            condition_id: 0,
            usage_id: 0,
            inline_image: "",
            featured_banner: "",
            review_count: 0,
            like: 0,
            embedd_map: "",
            max_attendee_count: 0,
            specialization_id: 0,
            address: "",
            websitename: "",
            telephone: "",
            title, 
            videoname: video, 
            classified_slug: slug, 
            banner_image, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords: meta_tags, 
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_tv_directory')
            .where({
            title, 
            videoname: video, 
            classified_slug: slug, 
            banner_image, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords: meta_tags, 
            is_active,
            })
            .first();

        return post;

    }

    async addCategoriesToVideo(categories) { 
        if (categories.length == 0) return

        await db('tbl_post_tv_directory_map')
            .batchInsert('tbl_post_tv_directory_map', categories, categories.length);
    }

    async editVideo (id, categories, title, video, slug, banner_image, meta_title, meta_description, meta_tags, is_active, language_id, user_id) {
        await db('tbl_tv_directory')
            .where({id})
            .update({
                title, 
                videoname: video, 
                classified_slug: slug, 
                banner_image, 
                meta_title, 
                meta_desc: meta_description, 
                meta_keywords: meta_tags, 
                is_active,
                language_id,
                updated_by: user_id
            })
        
        await db('tbl_post_tv_directory_map')
            .where({post_id: id})
            .del();

        if (categories.length > 0) {
            await this.addCategoriesToVideo(categories);
        }
    }

    async deleteVideo (id) {
        await db('tbl_tv_directory')
            .where({id})
            .del();

        await db('tbl_post_tv_directory_map')
            .where({post_id: id})
            .del();
    }

    async getVideos (limit, page, language_id, category_ids, is_active) {
        let posts;

        if (category_ids.length == 1) {
            posts = await db('tbl_tv_directory')
                .leftJoin('tbl_post_tv_directory_map', 'tbl_tv_directory.id', 'tbl_post_tv_directory_map.post_id')
                .where('tbl_post_tv_directory_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_tv_directory.language_id': language_id
                })
                .orderBy('tbl_tv_directory.id', 'desc')
                .limit(limit)
                .offset((page - 1) * limit)
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_tv_directory.is_active', is_active);
                    }
                })
        } else {
            posts = await db('tbl_tv_directory').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }

        return posts;
    }

    async getVideo (id) {
        const post = await db('tbl_tv_directory').where({id}).first();

        return post;
    }

    async getVideoWithSlug (slug) {
        const post = await db('tbl_tv_directory').where({classified_slug: slug}).first();

        return post;
    }

    async getVideoCategories (post_id) {
        const categories = await db('tbl_post_tv_directory_map')
            .select('tbl_tv_category.id', 'tbl_tv_category.title')
            .leftJoin("tbl_tv_category", "tbl_post_tv_directory_map.category_id", "tbl_tv_category.id")
            .where({
                "tbl_post_tv_directory_map.post_id": post_id
            })

        return categories;
    }

    async getVideosCount (language_id, category_ids, is_active) {
        let postsCount;
        if (category_ids.length == 1) {
            postsCount = await db('tbl_tv_directory')
                .leftJoin('tbl_post_tv_directory_map', 'tbl_tv_directory.id', 'tbl_post_tv_directory_map.post_id')
                .where('tbl_post_tv_directory_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_tv_directory.language_id': language_id
                })
                .count('tbl_tv_directory.id as count')
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_tv_directory.is_active', is_active);
                    }
                })
        } else {
            postsCount = await db('tbl_tv_directory').where({language_id}).orderBy('id', 'desc').count('id as count')
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }

        return postsCount[0].count;
    }
}

module.exports = new TvService();