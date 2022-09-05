const db = require('../db/db.js');

class SettingsService {

    // lifestle Categories

    async createSetting (setting_title, setting_value, language_id, user_id) {
        await db('tbl_setting').insert({
            created_date: new Date(),
            default_title: setting_title, 
            value: setting_value,
            language_id,
            created_by: user_id,
            updated_by: user_id
        })

        let post = await db('tbl_setting')
            .where({
                default_title: setting_title, 
                value: setting_value, 
            })
            .first();

        return post;

    }


    async editSetting (id, setting_title, setting_value, language_id, user_id) {
        await db('tbl_setting')
            .where({id})
            .update({
                default_title: setting_title, 
                value: setting_value,
                language_id,

                updated_by: user_id
            })
    }

    async deleteSetting (id) {
        await db('tbl_setting')
            .where({id})
            .del();
    }

    async getSettings (limit, page, language_id, is_active) {
        let posts;

        posts = await db('tbl_setting').where({language_id}).orderBy('id', 'desc').offset((page - 1) * limit).limit(limit)
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return posts;
    }

    async getSetting (id) {
        const post = await db('tbl_setting').where({id}).first();

        return post;
    }

    async getSettingFromTitle (default_title) {
        const post = await db('tbl_setting').where({default_title}).first();

        return post;
    }

    async getSettingsCount (language_id, is_active) {
        const count = await db('tbl_setting').where({language_id}).count('id as count')
        .modify(function(queryBuilder) {
            if (is_active != 'all') {
                queryBuilder.where('is_active', is_active);
            }
        })

        return count[0].count;
    }
}

module.exports = new SettingsService();