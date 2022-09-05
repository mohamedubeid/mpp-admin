const EventsService = require('../services/events');

class EventsController {

    // Events Functions
    
    async createEvent (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { title, slug, telephone_number, event_date, venue, organizer, event_fax, event_email, website, description, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !telephone_number || !event_date || !venue || !organizer || !event_fax || !event_email || !website || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let eventSameSlug = await EventsService.getEventWithSlug(slug);
        if (eventSameSlug) return { error: "Event with that slug already exists, please choose another slug", statusCode: 400 }

        let event;
        try {
            event = await EventsService.createEvent(title, slug, telephone_number, event_date, venue, organizer, event_fax, event_email, website, description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user.id)
        } catch (error) {
            return { message: "Error creating event, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created Event!", event, statusCode: 200 }
    }

    async editEvent (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide an event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        let event = await EventsService.getEvent(id);

        if (!event) return { error: "Event not found", statusCode: 404 }

        let banner_image = event.banner_image;
        if (req.file) banner_image = req.file.filename;

        let { title, slug, telephone_number, event_date, venue, organizer, event_fax, event_email, website, description, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !telephone_number || !event_date || !venue || !organizer || !event_fax || !event_email || !website || !meta_title || !meta_tags || !language_id  ) return { error: "Please fill out all fields", statusCode: 400 }

        let eventSameSlug = await EventsService.getEventWithSlug(slug);
        if (eventSameSlug && eventSameSlug.id != id) return { error: "Event with that slug already exists, please choose another slug", statusCode: 400 }

        event = null;
        try {
            event = await EventsService.editEvent(id, title, slug, telephone_number, event_date, venue, organizer, event_fax, event_email, website, description, banner_image, meta_title, meta_tags, meta_description, is_active , language_id, user.id);
        } catch (error) {
            return { message: "Error editing event, please try again later", err: error, statusCode: 500 }
        }
        
        return { message: "Successfully edited Event!", event, statusCode: 200 }
    }

    async deleteEvent(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        const event = await EventsService.getEvent(id);

        if (!event) return { error: "Event not found", statusCode: 404 }

        try {
            await EventsService.deleteEvent(id);
        } catch (error) {
            return { message: "Error deleting event, please try again later", err: error, statusCode: 500 }
        }

        return { event, statusCode: 200 }
    }

    async getAllEvent(req, res) {
        let { language_id, limit, page, is_active } = req.query;
        
        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';
        
        let events = await EventsService.getEvents(limit, page, language_id, is_active);

        let eventsCount = await EventsService.getEventsCount(language_id, is_active);

        let pagesAvailable = Math.ceil(eventsCount / limit);

        return { events, pagesAvailable, statusCode: 200 }
    }

    async getEvent(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        const event = await EventsService.getEvent(id);

        if (!event) return { error: "Event not found", statusCode: 404 }

        return { event, statusCode: 200 }
    }

    async getEventWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a event slug", statusCode: 400 }

        const event = await EventsService.getEventWithSlug(slug);

        if (!event) return { error: "Event not found", statusCode: 404 }

        return { event, statusCode: 200 }
    }

    async createEventImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { event_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!event_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let event = await EventsService.getEvent(event_id);
        if (!event) return { error: "Event not found", statusCode: 404 }

        let image;
        try {
            image = await EventsService.createEventImage(event_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding event image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added Event Image!", image, statusCode: 200 }
    }

    async getAllEventImages(req, res) {
        let { event_id } = req.params;
        let images = await EventsService.getEventImages(event_id)

        return { images, statusCode: 200 }
    }

    async editEventImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        const image = await EventsService.getEventImage(id);

        if (!image) return { error: "Event image not found", statusCode: 404 }

        try {
            await EventsService.editEventImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error deleting event image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deleteEventImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a event ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid event ID", statusCode: 400 }

        const image = await EventsService.getEventImage(id);

        if (!image) return { error: "Event image not found", statusCode: 404 }

        try {
            await EventsService.deleteEventImage(id);
        } catch (error) {
            return { message: "Error deleting event image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }
}

module.exports = new EventsController();