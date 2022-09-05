const SlidersService = require('../services/slider');

class SlidersController {

    // Sliders Eost Functions
    
    async createSlider (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { title, short_description, description, link, is_active , language_id } = req.body;

        if (!title || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let slider;
        try {
            slider = await SlidersService.createSlider(title, short_description, description, link, banner_image, is_active, language_id, user.id)
        } catch (error) {
            return { message: "Error creating slider, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Slider!", slider, statusCode: 200 }
    }

    async editSlider (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a slider ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid slider ID", statusCode: 400 }

        let slider = await SlidersService.getSlider(id)

        if (!slider) return { error: "Slider not found", statusCode: 404 }

        let banner_image = slider.banner_image;
        if (req.file) banner_image = req.file.filename;

        let {title, short_description, description, link, is_active , language_id } = req.body;

        if (!title || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        slider = null;
        try {
            slider = await SlidersService.editSlider(id, title, short_description, description, link, banner_image, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing slider, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Slider!", slider, statusCode: 200 }
    }

    async deleteSlider(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a slider ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid slider ID", statusCode: 400 }

        const slider = await SlidersService.getSlider(id);

        if (!slider) return { error: "Slider not found", statusCode: 404 }

        try {
            await SlidersService.deleteSlider(id);
        } catch (error) {
            return { message: "Error deleting slider, please try again later", err: error, statusCode: 500 }
        }

        return { slider, statusCode: 200 }
    }

    async getAllSlider(req, res) {
        let { language_id, page, limit, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let sliders = await SlidersService.getSliders(limit, page, language_id, is_active)

        let slidersCount = await SlidersService.getSlidersCount(language_id, is_active)

        let pagesAvailable = Math.ceil(slidersCount / limit);

        return { sliders, pagesAvailable, statusCode: 200 }
    }

    async getSlider(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a slider ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid slider ID", statusCode: 400 }

        const slider = await SlidersService.getSlider(id);

        if (!slider) return { error: "Slider not found", statusCode: 404 }

        return { slider, statusCode: 200 }
    }
}

module.exports = new SlidersController();