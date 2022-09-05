const db = require('../db/db.js');

class SlidersService {

    // slider Categories

    async createSlider (title, short_description, description, link, banner_image, is_active , language_id, user_id) {
        await db('tbl_slider_directory').insert({
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
            small_description: short_description, 
            description, 
            classified_address: link,
            banner_image, 
            is_active, 
            language_id,
            
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_slider_directory')
            .where({
            title, 
            small_description: short_description, 
            description, 
             
            banner_image, 
            is_active, 
            })
            .first();

        return post;

    }


    async editSlider (id, title, short_description, description, link, banner_image, is_active , language_id, user_id) {
        await db('tbl_slider_directory')
            .where({id})
            .update({
            title, 
            small_description: short_description, 
            description, 
            classified_address: link,
            banner_image, 
            is_active, 
            language_id,

            updated_by: user_id
            })
    }

    async deleteSlider (id) {
        await db('tbl_slider_directory')
            .where({id})
            .del();
    }

    async getSliders (limit, page, language_id, is_active) {
        let posts;

        posts = await db('tbl_slider_directory').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return posts;
    }

    async getSlider (id) {
        const post = await db('tbl_slider_directory').where({id}).first();

        return post;
    }

    async getSlidersCount (language_id, is_active) {
        const count = await db('tbl_slider_directory').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }
}

module.exports = new SlidersService();