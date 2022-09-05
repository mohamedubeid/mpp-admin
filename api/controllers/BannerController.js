const BannersService = require('../services/banner');

class BannerController {

    // Banner Category Functions
    
    async createBanner (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { title, advertize_url, type, is_active, language_id } = req.body;

        if (!title || !language_id || !advertize_url || !type || !is_active) return { error: "Please fill out all fields", statusCode: 400 }

        let banner;
        try {
            banner = await BannersService.createBanner(title, advertize_url, banner_image, type, is_active, language_id, user.id)
        } catch (error) {
            return { message: "Error creating banner, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Banner!", banner, statusCode: 200 }
    }

    async editBanner (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a banner ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid banner ID", statusCode: 400 }

        let banner = await BannersService.getBanner(id)

        if (!banner) return { error: "Banner not found", statusCode: 404 }

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;
        if (!banner_image) {
            banner_image = banner.banner_image;
        }

        let { title, advertize_url, type, is_active, language_id } = req.body;

        if (!title || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        banner = null;
        try {
            banner = await BannersService.editBanner(id, title, advertize_url, banner_image, type, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing banner, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Banner!", banner, statusCode: 200 }
    }

    async deleteBanner(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a banner ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid banner ID", statusCode: 400 }

        const banner = await BannersService.getBanner(id);

        if (!banner) return { error: "Banner not found", statusCode: 404 }

        try {
            await BannersService.deleteBanner(id);
        } catch (error) {
            return { message: "Error deleting banner, please try again later", err: error, statusCode: 500 }
        }

        return { banner, statusCode: 200 }
    }

    async getAllBanners(req, res) {
        let { language_id, limit, page, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;

        if(is_active == null || is_active == undefined) is_active = 'all';

        let banners = await BannersService.getBanners(limit, page, language_id, is_active);

        let totalBannerCount = await BannersService.getBannersCount(language_id, is_active);

        let pagesAvailable = Math.ceil(totalBannerCount / limit);

        return { banners, pagesAvailable, statusCode: 200 }
    }

    async getBanner(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a banner ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid banner ID", statusCode: 400 }

        const banner = await BannersService.getBanner(id);

        if (!banner) return { error: "Banner not found", statusCode: 404 }

        return { banner, statusCode: 200 }
    }
}

module.exports = new BannerController();