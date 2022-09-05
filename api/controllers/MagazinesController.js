const MagazinesService = require('../services/magazines');

class MagazinesController {

    // Magazines Eost Functions
    
    async createMagazine (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let {title, slug, description, event_date, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let magazineSameSlug = await MagazinesService.getMagazineWithSlug(slug);
        if (magazineSameSlug) return { error: "Magazine with that slug already exists, please choose another slug", statusCode: 400 }

        let magazine;
        try {
            magazine = await MagazinesService.createMagazine(title, slug, description, banner_image, event_date, meta_title, meta_tags, meta_description, is_active, language_id, user.id)
        } catch (error) {
            return { message: "Error creating magazine, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Magazine!", magazine, statusCode: 200 }
    }

    async editMagazine (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a magazine ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid magazine ID", statusCode: 400 }

        let magazine = await MagazinesService.getMagazine(id)

        if (!magazine) return { error: "Magazine not found", statusCode: 404 }

        let banner_image = magazine.banner_image;
        if (req.file) banner_image = req.file.filename;

        let { title, slug, description, event_date, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id ) return { error: "Please fill out all fields", statusCode: 400 }

        let magazineSameSlug = await MagazinesService.getMagazineWithSlug(slug);
        if (magazineSameSlug && magazineSameSlug.id != id) return { error: "Magazine with that slug already exists, please choose another slug", statusCode: 400 }

        magazine = null;
        try {
            magazine = await MagazinesService.editMagazine(id, title, slug, description, banner_image, event_date, meta_title, meta_tags, meta_description, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing magazine, please try again later", err: error, statusCode: 500 }
        }

        return { message: "Successfully edited Magazine!", magazine, statusCode: 200 }
    }

    async deleteMagazine(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a magazine ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid magazine ID", statusCode: 400 }

        const magazine = await MagazinesService.getMagazine(id);

        if (!magazine) return { error: "Magazine not found", statusCode: 404 }

        try {
            await MagazinesService.deleteMagazine(id);
        } catch (error) {
            return { message: "Error deleting magazine, please try again later", err: error, statusCode: 500 }
        }

        return { magazine, statusCode: 200 }
    }

    async getAllMagazine(req, res) {
        let {language_id, limit, page, is_active} = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let magazines = await MagazinesService.getMagazines(limit, page, language_id, is_active)

        let magazinesCount = await MagazinesService.getMagazinesCount(language_id, is_active)

        let pagesAvailable = Math.ceil(magazinesCount / limit);

        return { magazines, pagesAvailable, statusCode: 200 }
    }

    async getMagazine(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a magazine ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid magazine ID", statusCode: 400 }

        const magazine = await MagazinesService.getMagazine(id);

        if (!magazine) return { error: "Magazine not found", statusCode: 404 }

        return { magazine, statusCode: 200 }
    }

    async getMagazineWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a magazine slug", statusCode: 400 }

        const magazine = await MagazinesService.getMagazineWithSlug(slug);

        if (!magazine) return { error: "Magazine not found", statusCode: 404 }

        return { magazine, statusCode: 200 }
    }

    async createMagazineImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { magazine_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!magazine_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let magazine = await MagazinesService.getMagazine(magazine_id);
        if (!magazine) return { error: "Magazine not found", statusCode: 404 }

        let image;
        try {
            image = await MagazinesService.createMagazineImage(magazine_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding magazine image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added Magazine Image!", image, statusCode: 200 }
    }

    async getAllMagazineImages(req, res) {
        let { magazine_id } = req.params;
        let images = await MagazinesService.getMagazineImages(magazine_id)

        return { images, statusCode: 200 }
    }

    async editMagazineImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a magazine ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid magazine ID", statusCode: 400 }

        const image = await MagazinesService.getMagazineImage(id);

        if (!image) return { error: "Magazine image not found", statusCode: 404 }

        try {
            await MagazinesService.editMagazineImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error deleting magazine image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deleteMagazineImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a magazine ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid magazine ID", statusCode: 400 }

        const image = await MagazinesService.getMagazineImage(id);

        if (!image) return { error: "Magazine image not found", statusCode: 404 }

        try {
            await MagazinesService.deleteMagazineImage(id);
        } catch (error) {
            return { message: "Error deleting magazine image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }
}

module.exports = new MagazinesController();