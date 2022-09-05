const ContactService = require('../services/contact');

class ContactController {

    // ContactFunctions
    
    async createContact (req, res) {
        let { full_name, email, phone_number, company, country, comments, ip_address } = req.body;

        if (!full_name || !email || !phone_number || !company || !country || !comments ) return { error: "Please fill out all fields", statusCode: 400 }

        if(!ip_address) ip_address = req.ip;
        let contact;
        try {
            contact = await ContactService.createContact(full_name, email, phone_number, company, country, comments, ip_address);
        } catch (error) {
            return { message: "Error creating contact, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Contact!", contact_request: contact, statusCode: 200 }
    }
    
    async deleteContact(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a contact ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid contact ID", statusCode: 400 }

        const contact = await ContactService.getContact(id);

        if (!contact) return { error: "Contact Request not found", statusCode: 404 }

        try {
            await ContactService.deleteContact(id);
        } catch (error) {
            return { message: "Error deleting contact, please try again later", err: error, statusCode: 500 }
        }

        return { contact, statusCode: 200 }
    }

    async getAllContact(req, res) {
        let { limit, page } = req.query;

        page = parseInt(page);

        if(!page || typeof page !== "number") page = 1;

        const contact_requests = await ContactService.getContacts(limit, page)

        let count = await ContactService.getContactsCount();

        let pagesAvailable = Math.ceil(count / limit);

        return { contact_requests, pagesAvailable, statusCode: 200 }
    }

    async getContact(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a contact_request ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid contact_request ID", statusCode: 400 }

        const contact_request = await ContactService.getContact(id);

        if (!contact_request) return { error: "Contact not found", statusCode: 404 }

        return { contact_request, statusCode: 200 }
    }
}

module.exports = new ContactController();