const PhotoshootsService = require('../services/photoshoot');

class PhotoshootsController {

    // Photoshoots Eost Functions
    
    async createPhotoshoot (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { title, slug, description, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let photoshootSameSlug = await PhotoshootsService.getPhotoshootWithSlug(slug);
        if (photoshootSameSlug) return { error: "Photoshoot with that slug already exists, please choose another slug", statusCode: 400 }

        let photoshoot;
        try {
            photoshoot = await PhotoshootsService.createPhotoshoot(title, slug, description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user.id)
        } catch (error) {
            return { message: "Error creating photoshoot, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Photoshoot!", photoshoot, statusCode: 200 }
    }

    async editPhotoshoot (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a photoshoot ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid photoshoot ID", statusCode: 400 }

        let photoshoot = await PhotoshootsService.getPhotoshoot(id)

        if (!photoshoot) return { error: "Photoshoot not found", statusCode: 404 }

        let banner_image = photoshoot.banner_image;
        if (req.file) banner_image = req.file.filename;

        let { title, slug, description, meta_title, meta_tags, meta_description, is_active, language_id} = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let photoshootSameSlug = await PhotoshootsService.getPhotoshootWithSlug(slug);
        if (photoshootSameSlug && photoshootSameSlug.id != id) return { error: "Photoshoot with that slug already exists, please choose another slug", statusCode: 400 }

        photoshoot = null;
        try {
            photoshoot = await PhotoshootsService.editPhotoshoot(id, title, slug, description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing photoshoot, please try again later", err: error, statusCode: 500 }
        }

        return { message: "Successfully edited Photoshoot!", photoshoot, statusCode: 200 }
    }

    async deletePhotoshoot(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a photoshoot ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid photoshoot ID", statusCode: 400 }

        const photoshoot = await PhotoshootsService.getPhotoshoot(id);

        if (!photoshoot) return { error: "Photoshoot not found", statusCode: 404 }

        try {
            await PhotoshootsService.deletePhotoshoot(id);
        } catch (error) {
            return { message: "Error deleting photoshoot, please try again later", err: error, statusCode: 500 }
        }

        return { photoshoot, statusCode: 200 }
    }

    async getAllPhotoshoot(req, res) {
        let {language_id, page, limit, is_active} = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let photoshoots = await PhotoshootsService.getPhotoshoots(limit, page, language_id, is_active)

        let photoshootsCount = await PhotoshootsService.getPhotoshootsCount(language_id, is_active)

        let pagesAvailable = Math.ceil(photoshootsCount / limit);

        return { photoshoots, pagesAvailable, statusCode: 200 }
    }

    async getPhotoshoot(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a photoshoot ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid photoshoot ID", statusCode: 400 }

        const photoshoot = await PhotoshootsService.getPhotoshoot(id);

        if (!photoshoot) return { error: "Photoshoot not found", statusCode: 404 }

        return { photoshoot, statusCode: 200 }
    }

    async getPhotoshootWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a photoshoot slug", statusCode: 400 }

        const photoshoot = await PhotoshootsService.getPhotoshootWithSlug(slug);

        if (!photoshoot) return { error: "Photoshoot not found", statusCode: 404 }

        return { photoshoot, statusCode: 200 }
    }

    async createPhotoshootImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { photoshoot_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!photoshoot_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let event = await PhotoshootsService.getPhotoshoot(photoshoot_id);
        if (!event) return { error: "Photoshoot not found", statusCode: 404 }

        let image;
        try {
            image = await PhotoshootsService.createPhotoshootImage(photoshoot_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding event image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added Photoshoot Image!", image, statusCode: 200 }
    }

    async getAllPhotoshootImages(req, res) {
        let { photoshoot_id } = req.params;
        let images = await PhotoshootsService.getPhotoshootImages(photoshoot_id)

        return { images, statusCode: 200 }
    }

    async editPhotoshootImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        const image = await PhotoshootsService.getPhotoshootImage(id);

        if (!image) return { error: "Photoshoot image not found", statusCode: 404 }

        try {
            await PhotoshootsService.editPhotoshootImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error deleting event image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deletePhotoshootImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        const image = await PhotoshootsService.getPhotoshootImage(id);

        if (!image) return { error: "Photoshoot image not found", statusCode: 404 }

        try {
            await PhotoshootsService.deletePhotoshootImage(id);
        } catch (error) {
            return { message: "Error deleting event image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }
}

module.exports = new PhotoshootsController();