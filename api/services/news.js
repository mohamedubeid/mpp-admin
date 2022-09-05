const db = require('../db/db.js');

class NewsService {
    // News Categories

    async createCategory (title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user_id) {
        await db('tbl_generic_category').insert({
            sub_title: "",
            parent_id: 0,
            category_image: "",
            category_order: 0,
            created_date: new Date(),
            deleted_date_time: new Date(),

            title, 
            url_slug: slug, 
            description, 
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
        await db('tbl_generic_category')
        .where({id})
        .update({

            title, 
            url_slug: slug, 
            description, 
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
        await db('tbl_generic_category')
            .where({id})
            .del();
    }

    async getCategories (limit, page, language_id, is_active) {
        let categories;

        categories = await db('tbl_generic_category').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return categories;
    }

    async getCategory (id) {
        const category = await db('tbl_generic_category').where({id}).first();

        return category;
    }

    async getCategoryWithSlug (slug) {
        const category = await db('tbl_generic_category').where({url_slug: slug}).first();

        return category;
    }

    async getCategoriesCount (language_id, is_active) {
        const count = await db('tbl_generic_category').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }

    // News Posts

    async createPost (title, slug, short_description, description, additional_description, date, banner_image, meta_title, meta_description, meta_keywords, sort_order, is_active, language_id, user_id) {
        await db('tbl_classified').insert({
            section_id: 1,
            classifed_modal: "",
            amount: 0,
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
            like:   0,
            embedd_map: "",
            max_attendee_count: 0,
            specialization_id: 0,

            title,
            classified_slug: slug,
            small_description: short_description, 
            description, 
            extra_description: additional_description,
            target_date: date,
            banner_image, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            sort_order, 
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_classified')
            .where({
                title,
                classified_slug: slug,
                small_description: short_description, 
                description, 
                extra_description: additional_description,
                target_date: date,
                banner_image, 
                meta_title, 
                meta_desc: meta_description, 
                meta_keywords, 
                sort_order, 
                is_active,
                language_id,
                created_by: user_id,
                updated_by: user_id
            })
            .first();

        return post;

    }

    async addCategoriesToPost(categories) { 
        if (categories.length == 0) return

        await db('tbl_post_category_map')
            .batchInsert('tbl_post_category_map', categories, categories.length);
    }

    async editPost (id, categories, title, slug, short_description, description, additional_description, date, banner_image, meta_title, meta_description, meta_keywords, sort_order, is_active, language_id, user_id) {
        await db('tbl_classified')
            .where({id})
            .update({
                title,
                classified_slug: slug,
                small_description: short_description, 
                description, 
                extra_description: additional_description,
                target_date: date,
                banner_image, 
                meta_title, 
                meta_desc: meta_description, 
                meta_keywords, 
                sort_order, 
                is_active,
                language_id,
                created_by: user_id,
                updated_by: user_id
            })
        
        await db('tbl_post_category_map')
            .where({post_id: id})
            .del();

        if (categories.length > 0) {
            await this.addCategoriesToPost(categories);
        }
    }

    async deletePost (id) {
        await db('tbl_classified')
            .where({id})
            .del();

        await db('tbl_post_category_map')
            .where({post_id: id})
            .del();
    }

    async getPosts (limit, page, language_id, category_ids, is_active) {
        let posts;

        if (category_ids.length == 1) {
            posts = await db('tbl_classified')
                .leftJoin('tbl_post_category_map', 'tbl_classified.id', 'tbl_post_category_map.post_id')
                .where('tbl_post_category_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_classified.language_id': language_id
                })
                .orderBy('tbl_classified.id', 'desc')
                .limit(limit)
                .offset((page - 1) * limit)
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_classified.is_active', is_active);
                    }
                })
        } else {
            posts = await db('tbl_classified').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }
        
        return posts;
    }

    async getPost (id) {
        const post = await db('tbl_classified').where({id}).first();

        return post;
    }

    async getPostWithSlug (slug) {
        const post = await db('tbl_classified').where({classified_slug: slug}).first();

        return post;
    }

    async getPostsCount (language_id, category_ids, is_active) {
        let count;
        if (category_ids.length == 1) {
            count = await db('tbl_classified')
                .leftJoin('tbl_post_category_map', 'tbl_classified.id', 'tbl_post_category_map.post_id')
                .where('tbl_post_category_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_classified.language_id': language_id
                })
                .count('tbl_classified.id as count')
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_classified.is_active', is_active);
                    }
                })
        } else {
            count = await db('tbl_classified').where({language_id}).count('id as count')
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }

        return count[0].count;
    }

    async getPostCategories (post_id) {
        const categories = await db('tbl_post_category_map')
            .select('tbl_generic_category.id', 'tbl_generic_category.title')
            .leftJoin("tbl_generic_category", "tbl_post_category_map.category_id", "tbl_generic_category.id")
            .where({
                "tbl_post_category_map.post_id": post_id
            })

        return categories;
    }

    async createPostImage (post_id, image_name, caption, language_id, is_active) {
        await db('tbl_classified_image').insert({
            created_date_time: new Date(),
            classified_id: post_id,
            classified_image: image_name,
            language_id,
            is_active,
        })

        let image = await db('tbl_classified_image')
            .where({
                classified_id: post_id,
                classified_image: image_name,
                language_id,
                is_active,
            })
            .first();

        return image;
    }

    async getPostImage (id) {
        const post = await db('tbl_classified_image').where({id}).first();

        return post;
    }

    async getPostImages (post_id) {
        const post = await db('tbl_classified_image').where({classified_id: post_id})

        return post;
    }

    async editPostImageStatus (id, is_active) {
        await db('tbl_classified_image')
            .where({id})
            .update({
                is_active
            })
    }   

    async deletePostImage (id) {
        await db('tbl_classified_image')
            .where({id})
            .del();
    }
}

module.exports = new NewsService();