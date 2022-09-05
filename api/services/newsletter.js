const db = require('../db/db.js');

class NewsletterService {

    // lifestle Categories

    async createNewsletter (full_name, company_name, email, city, country, ip_address, language_id) {
        await db('tbl_subscription').insert({
            fname: full_name, 
            company_name, 
            email, 
            city,
            country_name: country, 
            language_id,
            created_ip: ip_address,
            updated_ip: ip_address,
            created_date_time: new Date()
        })

        let post = await db('tbl_subscription')
            .where({
                fname: full_name, 
                company_name, 
                email, 
                city,
                language_id,
                country_name: country, 
                created_ip: ip_address,
                updated_ip: ip_address,
            })
            .first();

        return post;

    }

    async deleteNewsletter (id) {
        await db('tbl_subscription')
            .where({id})
            .del();
    }

    async getNewsletters (limit, page, is_active) {
        let posts;

        posts = await db('tbl_subscription').orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return posts;
    }

    async getNewsletter (id) {
        const post = await db('tbl_subscription').where({id}).first();

        return post;
    }
    
    async getNewslettersCount (is_active) {
        const count = await db('tbl_subscription').count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }
}

module.exports = new NewsletterService();