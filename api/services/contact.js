const db = require('../db/db.js');

class ContactService {

    // lifestle Categories

    async createContact (full_name, email, phone_number, company, country, comments, ip_address) {
        await db('tbl_contact_us').insert({
            name: full_name,
            email, 
            contact_no: phone_number,
            company,
            country: country,
            comments,
            created_ip: ip_address,
            updated_ip: ip_address,
            created_date_time: new Date()
        })

        let post = await db('tbl_contact_us')
            .where({
                name: full_name,
                email, 
                contact_no: phone_number,
                company,
                country: country,
                comments,
                created_ip: ip_address,
                updated_ip: ip_address,
            })
            .first();

        return post;

    }

    async deleteContact (id) {
        await db('tbl_contact_us')
            .where({id})
            .del();
    }

    async getContacts (limit, page) {
        let posts;

        if(page == 1) {
            posts = await db('tbl_contact_us').orderBy('id', 'desc').limit(limit);
        } else {
            posts = await db('tbl_contact_us').orderBy('id', 'desc').limit(limit).offset((page-1)*limit);
        }

        return posts;
    }

    async getContact (id) {
        const post = await db('tbl_contact_us').where({id}).first();

        return post;
    }

    async getContactsCount () {
        const count = await db('tbl_contact_us').count('id as count');

        return count[0].count;
    }
}

module.exports = new ContactService();