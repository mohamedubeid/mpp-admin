const db = require('../db/db.js');

class UserService {
    async createUser (first_name, last_name, email, password, phone_number) {
        await db('tbl_admin').insert({
            created_date: new Date(),
            last_login_date: new Date(),
            last_login_ip: '',
            password_token: '',
            first_name,
            last_name,
            email,
            password,
            contact_no: phone_number
        })
    }

    async getUser (id) {
        const user = await db('tbl_admin').where({id}).first();

        return user;
    }

    async getUserByEmail (email) {
        const user = await db('tbl_admin').where({email}).first();

        return user;
    }

    async getAllUserEmails () {
        return db('tbl_admin').select('email').pluck('email');
    }
}

module.exports = new UserService();