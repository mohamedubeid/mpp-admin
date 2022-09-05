const db = require('../db/db.js');

class CmspagesService {

    // CMS Functions

    async createCmspage (parent_page, title, slug, short_description, description, meta_title, meta_keywords, meta_description,is_active, cms_order, language_id, user_id) {
        await db('tbl_cms').insert({
            cms_banner_image: "",
            deleted_date_time: new Date(),
            created_date_time: new Date(),
            parent_id: parent_page, 
            title, 
            cms_slug: slug, 
            small_description: short_description, 
            description, 
            meta_title, 
            meta_keywords, 
            meta_desc: meta_description,
            is_active, 
            cms_order,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_cms')
            .where({
                parent_id: parent_page, 
                title, 
                cms_slug: slug, 
                small_description: short_description, 
                description, 
                meta_title, 
                meta_keywords, 
                meta_desc: meta_description,
                is_active,
                language_id
            })
            .first();

        return post;

    }


    async editCmspage (id, parent_page, title, slug, short_description, description, meta_title, meta_keywords, meta_description,is_active, language_id, user_id) {
        await db('tbl_cms')
            .where({id})
            .update({
                parent_id: parent_page, 
                title, 
                cms_slug: slug, 
                small_description: short_description, 
                description, 
                meta_title, 
                meta_keywords, 
                meta_desc: meta_description,
                is_active,
                language_id,
                updated_by: user_id
            })
    }

    async deleteCmspage (id) {
        await db('tbl_cms')
            .where({id})
            .del();
    }

    async getCmspages (limit, page, language_id, is_active) {
        let posts;

        posts = await db('tbl_cms').where({language_id}).where({language_id}).orderBy('id', 'desc').limit(limit).offset((page - 1) * limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return posts;
    }

    async getCmspage (id) {
        const post = await db('tbl_cms').where({id}).first();

        return post;
    }

    async getCmspageWithSlug (slug) {
        const post = await db('tbl_cms').where({cms_slug: slug}).first();

        return post;
    }

    async getCmspagesCount (language_id, is_active) {
        const count = await db('tbl_cms').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }
}

module.exports = new CmspagesService();