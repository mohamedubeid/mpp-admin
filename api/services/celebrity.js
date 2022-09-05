const db = require('../db/db.js');

class CelebrityService {
    // Celebrity Categories

    async createCategory (parent_page, title, slug, description, meta_title, meta_keywords, meta_description, is_active, category_order, language_id, user_id) {
        await db('tbl_celebrity_category').insert({ 
            sub_title: "",
            category_image: "",
            parent_id: parent_page,
            category_order,
            created_date: new Date(),
            deleted_date_time: new Date(),
            banner_image: "",
            title, 
            description, 
            url_slug:slug, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })
    }

    async editCategory (id, parent_page, title, slug, description, meta_title, meta_keywords, meta_description, is_active, language_id, user_id) {
        await db('tbl_celebrity_category')
        .where({id})
        .update({
            sub_title: "",
            category_image: "",
            parent_id: parent_page,
            created_date: new Date(),
            deleted_date_time: new Date(),
            banner_image: "",
            title, 
            description, 
            url_slug:slug, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            is_active,
            on_header: 1,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })
    }

    async deleteCategory (id) {
        await db('tbl_celebrity_category')
            .where({id})
            .del();
    }

    async getCategories (limit, page, language_id, is_active) {
        let categories;

        categories = await db('tbl_celebrity_category').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return categories;
    }

    async getCategory (id) {
        const category = await db('tbl_celebrity_category').where({id}).first();

        return category;
    }

    async getCategoryWithSlug (slug) {
        const category = await db('tbl_celebrity_category').where({url_slug:slug}).first();

        return category;
    }

    async getCategoriesCount (language_id, is_active) {
        const count = await db('tbl_celebrity_category').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }

    // Celebrity Posts

    async createPost (title, slug, description, short_description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user_id) {
        await db('tbl_celebrity_directory').insert({
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
            description,
            classified_slug: slug, 
            small_description: short_description, 
            banner_image, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords: meta_tags,
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_celebrity_directory')
            .where({
            title,
            description,
            classified_slug: slug, 
            small_description: short_description, 
            banner_image, 
            meta_title, 
            meta_desc: meta_description,
            meta_keywords: meta_tags,
            is_active
            })
            .first();

        return post;

    }

    async addCategoriesToPost(categories) { 
        if (categories.length == 0) return

        await db('tbl_post_celebrity_directory_map')
            .batchInsert('tbl_post_celebrity_directory_map', categories, categories.length);
    }

    async editPost (id, title, description, slug, short_description, banner_image, meta_title, meta_description, meta_tags, is_active, categories, language_id, user_id) {
        await db('tbl_celebrity_directory')
            .where({id})
            .update({
            title,
            description,
            classified_slug: slug, 
            small_description: short_description, 
            banner_image, 
            meta_title, 
            meta_desc: meta_description,
            meta_keywords: meta_tags,
            is_active,
            language_id,
            updated_by: user_id
            })
        
        await db('tbl_post_celebrity_directory_map')
            .where({post_id: id})
            .del();

        if (categories && categories.length > 0) {
            await this.addCategoriesToPost(categories);
        }
    }

    async deletePost (id) {
        await db('tbl_celebrity_directory')
            .where({id})
            .del();

        await db('tbl_post_celebrity_directory_map')
            .where({post_id: id})
            .del();
    }

    async getPosts (limit, page, language_id, category_ids, is_active) {
        let posts;
        if(category_ids.length == 1) {
            posts = await db('tbl_celebrity_directory')
                .leftJoin('tbl_post_celebrity_directory_map', 'tbl_celebrity_directory.id', 'tbl_post_celebrity_directory_map.post_id')
                .where('tbl_post_celebrity_directory_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_celebrity_directory.language_id': language_id
                })
                .orderBy('tbl_celebrity_directory.id', 'desc')
                .limit(limit)
                .offset((page - 1) * limit)
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_celebrity_directory.is_active', is_active);
                    }
                });
        } else {
            posts = await db('tbl_celebrity_directory').where({language_id}).orderBy('id', 'desc').limit(limit).offset((page - 1) * limit)
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('tbl_celebrity_directory.is_active', is_active);
                }
            })
        }

        return posts;
    }

    async getPost (id) {
        const post = await db('tbl_celebrity_directory').where({id}).first();

        return post;
    }

    async getPostWithSlug (slug) {
        const post = await db('tbl_celebrity_directory').where({classified_slug: slug}).first();

        return post;
    }

    async getPostCategories (post_id) {
        const categories = await db('tbl_post_celebrity_directory_map')
            .select('tbl_celebrity_category.id', 'tbl_celebrity_category.title')
            .leftJoin("tbl_celebrity_category", "tbl_post_celebrity_directory_map.category_id", "tbl_celebrity_category.id")
            .where({
                "tbl_post_celebrity_directory_map.post_id": post_id
            })

        return categories;
    }

    async getPostsCount (language_id, category_ids, is_active) {
        let count;
        if(category_ids.length == 1) {
            count = await db('tbl_celebrity_directory')
                .leftJoin('tbl_post_celebrity_directory_map', 'tbl_celebrity_directory.id', 'tbl_post_celebrity_directory_map.post_id')
                .where('tbl_post_celebrity_directory_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_celebrity_directory.language_id': language_id
                })
                .count('tbl_celebrity_directory.id as count')
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_celebrity_directory.is_active', is_active);
                    }
                })
        } else {
            count = await db('tbl_celebrity_directory').where({language_id}).count('id as count')
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }

        return count[0].count;
    }

    async createPostImage (post_id, image_name, caption, language_id, is_active) {
        await db('tbl_celebrity_directory_image').insert({
            created_date_time: new Date(),
            classified_id: post_id,
            classified_image: image_name,
            image_caption: caption,
            language_id,
            is_active,
        })

        let image = await db('tbl_celebrity_directory_image')
            .where({
                classified_id: post_id,
                classified_image: image_name,
                image_caption: caption,
                language_id,
                is_active,
            })
            .first();

        return image;
    }

    async getPostImage (id) {
        const post = await db('tbl_celebrity_directory_image').where({id}).first();

        return post;
    }

    async getPostImages (post_id) {
        const post = await db('tbl_celebrity_directory_image').where({classified_id: post_id})

        return post;
    }

    async editPostImageStatus (id, is_active) {
        await db('tbl_celebrity_directory_image')
            .where({id})
            .update({
                is_active
            })
    }   

    async deletePostImage (id) {
        await db('tbl_celebrity_directory_image')
            .where({id})
            .del();
    }
}

module.exports = new CelebrityService();