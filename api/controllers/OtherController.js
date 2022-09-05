const OtherService = require('../services/other');

class OtherController {
    async searchCategories(req, res) {
        let { query, limit, page, language_id, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        if (!query || query == "") return { error: "Please write a search query", statusCode: 400 }

        query = `%${query}%`

        let categories = await OtherService.searchCategories(query, limit, page, language_id, is_active)

        return { categories, statusCode: 200 }
    }

    async searchPosts(req, res) {
        let { query, limit, page, language_id, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        if (!query || query == "") return { error: "Please write a search query", statusCode: 400 }

        query = `%${query}%`

        let posts = await OtherService.searchPosts(query, limit, page, language_id, is_active)

        return { posts, statusCode: 200 }
    }
}

module.exports = new OtherController();