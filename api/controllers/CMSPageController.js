const CMSPageService = require('../services/cmspage');

class CMSPageController {

    // Cmspage Category Functions
    
    async createCmspage (req, res) {
        const user = req.user;

        let { parent_page, title, slug, short_description, description, meta_title, meta_keywords, meta_description,is_active, language_id } = req.body;

        if (!title || !slug || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let cmsPages = await CMSPageService.getCmspages(null, 1, null, 'all');

        let cmsPageSameSlug = await CMSPageService.getCmspageWithSlug(slug);
        if (cmsPageSameSlug) return { error: "CMS Page with that slug already exists, please choose another slug", statusCode: 400 }

        let cmspage;
        try {
            cmspage = await CMSPageService.createCmspage(parent_page, title, slug, short_description, description, meta_title, meta_keywords, meta_description, is_active, cmsPages.length, language_id, user.id)
        } catch (error) {
            return { message: "Error creating CMS Page, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created CMS Page!", cmspage, statusCode: 200 }
    }

    async editCmspage (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a cmspage ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid cmspage ID", statusCode: 400 }

        let cmspage = await CMSPageService.getCmspage(id)

        if (!cmspage) return { error: "Cmspage not found", statusCode: 404 }

        let { parent_page, title, slug, short_description, description, meta_title, meta_keywords, meta_description, is_active, language_id } = req.body;

        if (!title || !slug) return { error: "Please fill out all fields", statusCode: 400 }

        let cmsPageSameSlug = await CMSPageService.getCmspageWithSlug(slug);
        if (cmsPageSameSlug && cmsPageSameSlug.id != cmspage.id) return { error: "Cmspage with that slug already exists", statusCode: 400 }

        cmspage = null;
        try {
            cmspage = await CMSPageService.editCmspage(id, parent_page, title, slug, short_description, description, meta_title, meta_keywords, meta_description, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing CMS Page, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited CMS Page!", cmspage, statusCode: 200 }
    }

    async deleteCmspage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a cmspage ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid cmspage ID", statusCode: 400 }

        const cmspage = await CMSPageService.getCmspage(id);

        if (!cmspage) return { error: "CMS Page not found", statusCode: 404 }

        try {
            await CMSPageService.deleteCmspage(id);
        } catch (error) {
            return { message: "Error deleting cmspage, please try again later", err: error, statusCode: 500 }
        }

        return { cmspage, statusCode: 200 }
    }

    async getAllCmspage(req, res) {
        let { language_id, limit, page, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let cmspages = await CMSPageService.getCmspages(limit, page, language_id, is_active)

        let cmspagesCount = await CMSPageService.getCmspagesCount(language_id, is_active)

        let pagesAvailable = Math.ceil(cmspagesCount / limit);

        return { cmspages, pagesAvailable, statusCode: 200 }
    }

    async getCmspage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a CMS Page ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid CMS Page ID", statusCode: 400 }

        const cmspage = await CMSPageService.getCmspage(id);

        if (!cmspage) return { error: "Cmspage not found", statusCode: 404 }

        return { cmspage, statusCode: 200 }
    }

    async getCmspageWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a CMS Page Slug", statusCode: 400 }

        const cmspage = await CMSPageService.getCmspageWithSlug(slug);

        if (!cmspage) return { error: "Cmspage not found", statusCode: 404 }

        return { cmspage, statusCode: 200 }
    }
}

module.exports = new CMSPageController();