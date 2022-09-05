const db = require('../db/db.js');

class WatchesService {
    // Watches Categories

    async createCategory (title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user_id) {
        await db('tbl_directory_category').insert({
            sub_title: "",
            parent_id: 0,
            category_image: "",
            category_order: 1,
            created_date: new Date(),
            deleted_date_time: new Date(),
            banner_image: "",
            title, 
            description, 
            url_slug: slug, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            language_id,
            is_active,
            created_by: user_id,
            updated_by: user_id
        })

        console.log("after: " + language_id)
    }

    async editCategory (id, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user_id) {
        await db('tbl_directory_category')
        .where({id})
        .update({
            title, 
            description, 
            url_slug: slug, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            language_id,
            is_active,
            created_by: user_id,
            updated_by: user_id
        })
    }

    async deleteCategory (id) {
        await db('tbl_directory_category')
            .where({id})
            .del();
    }

    async getCategories (limit, page, language_id, is_active) {
        let categories;

        categories = await db('tbl_directory_category').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return categories;
    }

    async getCategory (id) {
        const category = await db('tbl_directory_category').where({id}).first();

        return category;
    }

    async getCategoryWithSlug (slug) {
        const category = await db('tbl_directory_category').where({url_slug: slug}).first();

        return category;
    }

    async getCategoriesCount (language_id, is_active) {
        const categoriesCount = await db('tbl_directory_category').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return categoriesCount[0].count;
    }

    // Watches Posts

    async createPost (title, description, slug, banner_image, writter_name, writter_position, writter_image, meta_title, meta_description, meta_keywords, icon_of_the_week, is_active, user_id) {
        await db('tbl_classified_directory').insert({
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
            banner_image, 
            writtername: writter_name, 
            writter_possition: writter_position, 
            writter_img: writter_image, 
            meta_title, 
            meta_desc: meta_description, 
            meta_keywords, 
            is_active,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_classified_directory')
            .where({
                title, 
                description, 
                classified_slug: slug, 
                banner_image, 
                writtername: writter_name, 
                writter_possition: writter_position, 
                writter_img: writter_image, 
                meta_title, 
                meta_desc: meta_description, 
                meta_keywords, 
                is_active,
            })
            .first();

        return post;

    }

    async addCategoriesToPost(categories) { 
        if (categories.length == 0) return

        await db('tbl_post_category_directory_map')
            .batchInsert('tbl_post_category_directory_map', categories, categories.length);
    }

    async editPost (id, categories, title, description, slug, banner_image, writter_name, writter_position, writter_image, meta_title, meta_description, meta_keywords, icon_of_the_week, is_active, user_id) {
        await db('tbl_classified_directory')
            .where({id})
            .update({
                title, 
                description, 
                classified_slug: slug, 
                banner_image, 
                writtername: writter_name, 
                writter_possition: writter_position, 
                writter_img: writter_image, 
                meta_title, 
                meta_desc: meta_description, 
                meta_keywords, 
                is_active,
            })
        
        await db('tbl_post_category_directory_map')
            .where({post_id: id})
            .del();

        if (categories.length > 0) {
            await this.addCategoriesToPost(categories);
        }
    }

    async deletePost (id) {
        await db('tbl_classified_directory')
            .where({id})
            .del();

        await db('tbl_post_category_directory_map')
            .where({post_id: id})
            .del();
    }

    async getPosts (limit, page, language_id, category_ids, is_active) {
        let posts;

        if(category_ids.length == 1) {
            posts = await db('tbl_classified_directory')
                .leftJoin('tbl_post_category_directory_map', 'tbl_classified_directory.id', 'tbl_post_category_directory_map.post_id')
                .where('tbl_post_category_directory_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_classified_directory.language_id': language_id
                })
                .orderBy('tbl_classified_directory.id', 'desc')
                .limit(limit)
                .offset((page - 1) * limit)
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_classified_directory.is_active', is_active);
                    }
                })
        } else {
            posts = await db('tbl_classified_directory').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }

        return posts;
    }

    async getPost (id) {
        const post = await db('tbl_classified_directory').where({id}).first();

        return post;
    }

    async getPostWithSlug (slug) {
        const post = await db('tbl_classified_directory').where({classified_slug: slug}).first();

        return post;
    }

    async getPostsCount (language_id, category_ids, is_active) {
        let postsCount;
        if(category_ids.length == 1) {
            postsCount = await db('tbl_classified_directory')
                .leftJoin('tbl_post_category_directory_map', 'tbl_classified_directory.id', 'tbl_post_category_directory_map.post_id')
                .where('tbl_post_category_directory_map.category_id', category_ids[0])
                .andWhere({
                    'tbl_classified_directory.language_id': language_id
                })
                .count('tbl_classified_directory.id as count')
                .modify(function(queryBuilder) {
                    if (is_active != 'all') {
                        queryBuilder.where('tbl_classified_directory.is_active', is_active);
                    }
                })
        } else {
            postsCount = await db('tbl_classified_directory').where({language_id}).count('id as count')
            .modify(function(queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            })
        }

        return postsCount[0].count;
    }

    async getPostCategories (post_id) {
        const categories = await db('tbl_post_category_directory_map')
            .select('tbl_directory_category.id', 'tbl_directory_category.title')
            .leftJoin("tbl_directory_category", "tbl_post_category_directory_map.category_id", "tbl_directory_category.id")
            .where({
                "tbl_post_category_directory_map.post_id": post_id
            })

        return categories;
    }

    async createPostImage (post_id, image_name, caption, language_id, is_active) {
        await db('tbl_classified_directory_image').insert({
            created_date_time: new Date(),
            classified_id: post_id,
            classified_image: image_name,
            image_caption: caption,
            language_id,
            is_active,
        })

        let image = await db('tbl_classified_directory_image')
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
        const post = await db('tbl_classified_directory_image').where({id}).first();

        return post;
    }

    async getPostImages (post_id) {
        const post = await db('tbl_classified_directory_image').where({classified_id: post_id})

        return post;
    }

    async editPostImageStatus (id, is_active) {
        await db('tbl_classified_directory_image')
            .where({id})
            .update({
                is_active
            })
    }   

    async deletePostImage (id) {
        await db('tbl_classified_directory_image')
            .where({id})
            .del();
    }
}

module.exports = new WatchesService();