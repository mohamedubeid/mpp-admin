const SettingsService = require('../services/settings');

class SettingController {

    // Setting Category Functions
    
    async createSetting (req, res) {
        const user = req.user;

        let { setting_title, setting_value, language_id } = req.body;

        if (!setting_title || !setting_value || !language_id ) return { error: "Please fill out all fields", statusCode: 400 }

        // getSettingFromTitle
        let settingSameTitle = await SettingsService.getSettingFromTitle(setting_title);
        if (settingSameTitle) return { error: "Setting with that title already exists", statusCode: 400 }


        let setting;
        try {
            setting = await SettingsService.createSetting(setting_title, setting_value, language_id, user.id);
        } catch (error) {
            return { message: "Error creating setting, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Setting!", setting, statusCode: 200 }
    }

    async editSetting (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a setting ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid setting ID", statusCode: 400 }

        let setting = await SettingsService.getSetting(id)

        if (!setting) return { error: "Setting not found", statusCode: 404 }

        let { setting_title, setting_value, language_id } = req.body;

        if (!setting_title || !setting_value || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let settingSameTitle = await SettingsService.getSettingFromTitle(setting_title);
        if (settingSameTitle && settingSameTitle.id != id) return { error: "Setting with that title already exists", statusCode: 400 }

        setting = null;
        try {
            setting = await SettingsService.editSetting(id, setting_title, setting_value, language_id, user.id);
        } catch (error) {
            return { message: "Error editing setting, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Setting!", setting, statusCode: 200 }
    }

    async deleteSetting(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a setting ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid setting ID", statusCode: 400 }

        const setting = await SettingsService.getSetting(id);

        if (!setting) return { error: "Setting not found", statusCode: 404 }

        try {
            await SettingsService.deleteSetting(id);
        } catch (error) {
            return { message: "Error deleting setting, please try again later", err: error, statusCode: 500 }
        }

        return { setting, statusCode: 200 }
    }

    async getAllSetting(req, res) {
        let { language_id, limit, page, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(isNaN(is_active)) is_active = "all"

        let settings = await SettingsService.getSettings(limit, page, language_id, is_active)

        let settingsCount = await SettingsService.getSettingsCount(language_id, is_active)

        let pagesAvailable = Math.ceil(settingsCount / limit);

        return { settings, pagesAvailable, statusCode: 200 }
    }

    async getSetting(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a setting ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid setting ID", statusCode: 400 }

        const setting = await SettingsService.getSetting(id);

        if (!setting) return { error: "Setting not found", statusCode: 404 }

        return { setting, statusCode: 200 }
    }

    async getSettingFromTitle(req, res) {
        let { title } = req.params;

        if (!title) return { error: "Please provide a setting title", statusCode: 400 }

        const setting = await SettingsService.getSettingFromTitle(title);

        if (!setting) return { error: "Setting not found", statusCode: 404 }

        return { setting, statusCode: 200 }
    }
}

module.exports = new SettingController();