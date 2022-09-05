const db = require('../db/db.js');

class MagazinesService {

    // magazine Categories

    async createMagazine (title, slug, description, banner_image, event_date, meta_title, meta_tags, meta_description, is_active, language_id, user_id) {
        await db('tbl_magazine_directory').insert({
            target_date: new Date(),
            section_id: 0,
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
            like: 0,
            embedd_map: "",
            max_attendee_count: 0,
            specialization_id: 0,
            address: "",
            websitename: "",
            telephone: "",

            title,
            classified_slug: slug,
            description,
            banner_image, 
            meta_title, 
            meta_keywords:meta_tags, 
            meta_desc: meta_description, 
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_magazine_directory')
            .where({
                title,
                classified_slug: slug,
                description,
                banner_image,
                meta_title, 
                meta_keywords:meta_tags, 
                meta_desc:meta_description, 
                is_active
            })
            .first();

        return post;

    }


    async editMagazine (id, title, slug, description, banner_image, event_date, meta_title, meta_tags, meta_description, is_active, language_id, user_id) {
        await db('tbl_magazine_directory')
            .where({id})
            .update({
                title,
                classified_slug: slug,
                description,

                banner_image, 
                target_date:new Date(), 
                meta_title, 
                meta_keywords:meta_tags, 
                meta_desc:meta_description, 
                is_active ,
                language_id,

                updated_by: user_id
            })
    }

    async deleteMagazine (id) {
        await db('tbl_magazine_directory')
            .where({id})
            .del();
    }

    async getMagazines (limit, page, language_id, is_active) {
        let posts;

        posts = await db('tbl_magazine_directory').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return posts;
    }

    async getMagazine (id) {
        const post = await db('tbl_magazine_directory').where({id}).first();

        return post;
    }

    async getMagazineWithSlug (slug) {
        const post = await db('tbl_magazine_directory').where({classified_slug: slug}).first();

        return post;
    }

    async getMagazinesCount (language_id, is_active) {
        const count = await db('tbl_magazine_directory').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }

    async createMagazineImage (event_id, image_name, caption, language_id, is_active) {
        await db('tbl_magazine_directory_image').insert({
            created_date_time: new Date(),
            classified_id: event_id,
            classified_image: image_name,
            image_caption: caption,
            language_id,
            is_active,
        })

        let image = await db('tbl_magazine_directory_image')
            .where({
                classified_id: event_id,
                classified_image: image_name,
                image_caption: caption,
                language_id,
                is_active,
            })
            .first();

        return image;
    }

    async getMagazineImage (id) {
        const event = await db('tbl_magazine_directory_image').where({id}).first();

        return event;
    }

    async getMagazineImages (event_id) {
        const event = await db('tbl_magazine_directory_image').where({classified_id: event_id})

        return event;
    }

    async editMagazineImageStatus (id, is_active) {
        const event = await db('tbl_magazine_directory_image')
            .where({id})
            .update({
                is_active
            })
    }    

    async deleteMagazineImage (id) {
        await db('tbl_magazine_directory_image')
            .where({id})
            .del();
    }
}

module.exports = new MagazinesService();