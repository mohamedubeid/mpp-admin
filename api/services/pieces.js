const db = require('../db/db.js');

class PiecesService {

    //  pieces Categories
    async createPiece (title, banner_image, is_active , user_id) {
        await db('tbl_pieces_directory').insert({
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
            banner_image, 
            is_active,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_pieces_directory')
            .where({
                title, 
                banner_image, 
                is_active,
                created_by: user_id,
                updated_by: user_id
            })
            .first();

        return post;

    }


    async editPiece (id, title, banner_image, is_active, user_id) {
        await db('tbl_pieces_directory')
            .where({id})
            .update({
                title, 
                banner_image, 
                is_active,
                created_by: user_id,
                updated_by: user_id
            })
    }

    async deletePiece (id) {
        await db('tbl_pieces_directory')
            .where({id})
            .del();
    }

    async getPieces (limit, page, language_id, is_active) {
        let posts;

        posts = await db('tbl_pieces_directory').where({language_id}).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return posts;
    }

    async getPiece (id) {
        const post = await db('tbl_pieces_directory').where({id}).first();

        return post;
    }

    async getPieceWithSlug (slug) {
        const post = await db('tbl_pieces_directory').where({classified_slug: slug}).first();

        return post;
    }

    async getPiecesCount (language_id, is_active) {
        const count = await db('tbl_pieces_directory').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }
}

module.exports = new PiecesService();