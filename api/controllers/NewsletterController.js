const NewsletterService = require('../services/newsletter');

class NewsletterController {

    // Newsletter Category Functions
    
    async createNewsletter (req, res) {
        let { full_name, company_name, email, city, country, ip_address, language_id } = req.body;

        if (!full_name || !company_name || !email || !city || !country || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        if(!ip_address) ip_address = req.ip

        let newsletter;
        try {
            newsletter = await NewsletterService.createNewsletter(full_name, company_name, email, city, country, ip_address, language_id);
        } catch (error) {
            return { message: "Error creating newsletter, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Newsletter!", newsletter, statusCode: 200 }
    }
    
    async deleteNewsletter(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a subscriber ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid subscriber ID", statusCode: 400 }

        const subscriber = await NewsletterService.getNewsletter(id);

        if (!subscriber) return { error: "Newsletter not found", statusCode: 404 }

        try {
            await NewsletterService.deleteNewsletter(id);
        } catch (error) {
            return { message: "Error deleting subscriber, please try again later", err: error, statusCode: 500 }
        }

        return { subscriber, statusCode: 200 }
    }

    async getAllNewsletter(req, res) {
        let { limit, page, is_active } = req.query;

        page = parseInt(page);

        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        const subscribers = await NewsletterService.getNewsletters(limit, page, is_active)

        let subscribersCount = await NewsletterService.getNewslettersCount(is_active)

        let pagesAvailable = Math.ceil(subscribersCount / limit);

        return { subscribers, pagesAvailable, statusCode: 200 }
    }

    async getNewsletter(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a subscriber ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid subscriber ID", statusCode: 400 }

        const subscriber = await NewsletterService.getNewsletter(id);

        if (!subscriber) return { error: "Newsletter not found", statusCode: 404 }

        return { subscriber, statusCode: 200 }
    }
}

module.exports = new NewsletterController();