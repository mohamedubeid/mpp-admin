const LifestylesService = require('../services/lifeStyle');

class LifestyleController {

    // Lifestyle Category Functions
    
    async createLifestyle (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { title, slug, description, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id ) return { error: "Please fill out all fields", statusCode: 400 }

        let lifestyleSameSlug = await LifestylesService.getLifestyleWithSlug(slug);
        if (lifestyleSameSlug) return { error: "Lifestyle with that slug already exists, please choose another slug", statusCode: 400 }

        let lifestyle;
        try {
            lifestyle = await LifestylesService.createLifestyle(title, slug, description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user.id)
        } catch (error) {
            return { message: "Error creating lifestyle, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Lifestyle!", lifestyle, statusCode: 200 }
    }

    async editLifestyle (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a lifestyle ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid lifestyle ID", statusCode: 400 }

        let lifestyle = await LifestylesService.getLifestyle(id)

        if (!lifestyle) return { error: "Lifestyle not found", statusCode: 404 }

        let banner_image = lifestyle.banner_image;
        if (req.file) banner_image = req.file.filename;

        let { title, slug, description, meta_title,meta_tags,meta_description,is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let lifestyleSameSlug = await LifestylesService.getLifestyleWithSlug(slug);
        if (lifestyleSameSlug && lifestyleSameSlug.id != id) return { error: "Lifestyle with that slug already exists, please choose another slug", statusCode: 400 }

        lifestyle = null;
        try {
            lifestyle = await LifestylesService.editLifestyle(id, title, slug, description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing lifestyle, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Lifestyle!", lifestyle, statusCode: 200 }
    }

    async deleteLifestyle(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a lifestyle ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid lifestyle ID", statusCode: 400 }

        const lifestyle = await LifestylesService.getLifestyle(id);

        if (!lifestyle) return { error: "Lifestyle not found", statusCode: 404 }

        try {
            await LifestylesService.deleteLifestyle(id);
        } catch (error) {
            return { message: "Error deleting lifestyle, please try again later", err: error, statusCode: 500 }
        }

        return { lifestyle, statusCode: 200 }
    }

    async getAllLifestyle(req, res) {
        let { language_id, limit, page, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 1;

        let lifestyles = await LifestylesService.getLifestyles(limit, page, language_id, is_active)

        let lifestlesCount = await LifestylesService.getLifestyleCount(language_id, is_active);
        
        let pagesAvailable = Math.ceil(lifestlesCount / limit);

        return { lifestyles, pagesAvailable, statusCode: 200 }
    }

    async getLifestyle(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a lifestyle ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid lifestyle ID", statusCode: 400 }

        const lifestyle = await LifestylesService.getLifestyle(id);

        if (!lifestyle) return { error: "Lifestyle not found", statusCode: 404 }

        return { lifestyle, statusCode: 200 }
    }

    async getLifestyleWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a lifestyle slug", statusCode: 400 }

        const lifestyle = await LifestylesService.getLifestyleWithSlug(slug);

        if (!lifestyle) return { error: "Lifestyle not found", statusCode: 404 }

        return { lifestyle, statusCode: 200 }
    }

    async createLifestyleImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { lifestyle_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!lifestyle_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let lifestyle = await LifestylesService.getLifestyleImage(lifestyle_id);
        if (!lifestyle) return { error: "Lifestyle not found", statusCode: 404 }

        let image;
        try {
            image = await LifestylesService.createLifestyleImage(lifestyle_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding lifestyle image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added Lifestyle Image!", image, statusCode: 200 }
    }

    async getAllLifestyleImages(req, res) {
        let { lifestyle_id } = req.params;
        let images = await LifestylesService.getLifestyleImages(lifestyle_id);

        return { images, statusCode: 200 }
    }

    async editLifestyleImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a lifestyle image ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid lifestyle image ID", statusCode: 400 }

        const image = await LifestylesService.getLifestyleImage(id);

        if (!image) return { error: "Lifestyle image not found", statusCode: 404 }

        try {
            await LifestylesService.editLifestyleImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error editing lifestyle image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deleteLifestyleImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a lifestyle ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid lifestyle ID", statusCode: 400 }

        const image = await LifestylesService.getLifestyleImage(id);

        if (!image) return { error: "Lifestyle image not found", statusCode: 404 }

        try {
            await LifestylesService.deleteLifestyleImage(id);
        } catch (error) {
            return { message: "Error deleting lifestyle image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }
}

module.exports = new LifestyleController();