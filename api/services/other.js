const db = require('../db/db.js');

class OtherService {
    // Other/Misc Categories

    async searchCategories (query, limit, page, language_id, is_active) {
        let celebrityCategories = await db('tbl_celebrity_category').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let jewelryCategories = await db('tbl_jewelry_category').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let newsCategories = await db('tbl_generic_category').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let tvCategories = await db('tbl_tv_category').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let watchCategories = await db('tbl_directory_category').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return {
            celebrityCategories,
            jewelryCategories,
            newsCategories,
            tvCategories,
            watchCategories
        };
    }

    async searchPosts (query, limit, page, language_id, is_active) {
        let celebrityPosts = await db('tbl_celebrity_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let eventsPosts = await db('tbl_events_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let jewelryPosts = await db('tbl_jewelry_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let lifestylePosts = await db('tbl_lifestyle_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let magazinePosts = await db('tbl_magazine_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let newsPosts = await db('tbl_classified').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let photoshootPosts = await db('tbl_photoshoot_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let tvPosts = await db('tbl_tv_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        let watchPosts = await db('tbl_classified_directory').where({language_id}).whereILike('title', query).orderBy('id', 'desc').offset((page-1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return {
            celebrityPosts,
            eventsPosts,
            jewelryPosts,
            lifestylePosts,
            magazinePosts,
            newsPosts,
            photoshootPosts,
            tvPosts,
            watchPosts
        };
    }
}

module.exports = new OtherService();