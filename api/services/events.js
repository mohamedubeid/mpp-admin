const db = require('../db/db.js');

class EventsService {
    // event Categories

    async createEvent(
        title,
        slug,
        telephone_number,
        event_date,
        venue,
        organizer,
        event_fax,
        event_email,
        website,
        description,
        banner_image,
        meta_title,
        meta_tags,
        meta_description,
        is_active,
        language_id,
        user_id
    ) {
        await db('tbl_events_directory').insert({
            section_id: 0,
            classifed_modal: '',
            amount: 0,
            target_date: new Date(),
            created_date_time: new Date(),
            last_updated_ip: '',
            city_id: 0,
            classified_locality: '',
            classified_city_distance: 0,
            deleted_by: 0,
            age_group_id: 0,
            condition_id: 0,
            usage_id: 0,
            inline_image: '',
            featured_banner: '',
            review_count: 0,
            like: 0,
            embedd_map: '',
            max_attendee_count: 0,
            specialization_id: 0,
            address: '',
            title,
            classified_slug: slug,
            telephone: telephone_number,
            event_date,
            venue,
            organizer,
            event_fax,
            event_email,
            websitename: website,
            description,
            banner_image,
            meta_title,
            meta_keywords: meta_tags,
            meta_desc: meta_description,
            is_active,
            language_id,
            created_by: user_id,
            updated_by: user_id,
        });

        let event = await db('tbl_events_directory')
            .where({
                title,
                classified_slug: slug,
                telephone: telephone_number,
                event_date,
                venue,
                organizer,
                event_fax,
                event_email,
                website,
                description,
                banner_image,
                meta_title,
                meta_keywords: meta_tags,
                meta_desc: meta_description,
                is_active,
            })
            .first();

        return event;
    }

    async editEvent(
        id,
        title,
        slug,
        telephone_number,
        event_date,
        venue,
        organizer,
        event_fax,
        event_email,
        website,
        description,
        banner_image,
        meta_title,
        meta_tags,
        meta_description,
        is_active,
        language_id,
        user_id
    ) {
        await db('tbl_events_directory').where({ id }).update({
            section_id: 0,
            classifed_modal: '',
            amount: 0,
            target_date: new Date(),
            created_date_time: new Date(),
            last_updated_ip: '',
            city_id: 0,
            classified_locality: '',
            classified_city_distance: 0,
            deleted_by: 0,
            age_group_id: 0,
            condition_id: 0,
            usage_id: 0,
            inline_image: '',
            featured_banner: '',
            review_count: 0,
            like: 0,
            embedd_map: '',
            max_attendee_count: 0,
            specialization_id: 0,
            address: '',
            title,
            classified_slug: slug,
            telephone: telephone_number,
            event_date,
            venue,
            organizer,
            event_fax,
            event_email,
            websitename: website,
            description,
            banner_image,
            meta_title,
            meta_keywords: meta_tags,
            meta_desc: meta_description,
            is_active,
            language_id,
            updated_by: user_id,
        });
    }

    async deleteEvent(id) {
        await db('tbl_events_directory').where({ id }).del();
    }

    async getEvents(limit, page, language_id, is_active) {
        let events;

        events = await db('tbl_events_directory')
            .where({ language_id })
            .orderBy('id', 'desc')
            .offset((page - 1) * limit)
            .limit(limit)
            .modify(function (queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            });

        return events;
    }

    async getEvent(id) {
        const event = await db('tbl_events_directory').where({ id }).first();

        return event;
    }

    async getEventWithSlug(slug) {
        const event = await db('tbl_events_directory')
            .where({ classified_slug: slug })
            .first();

        return event;
    }

    async getEventsCount(language_id, is_active) {
        const eventsCount = await db('tbl_events_directory')
            .where({ language_id })
            .count('id as count')
            .modify(function (queryBuilder) {
                if (is_active != 'all') {
                    queryBuilder.where('is_active', is_active);
                }
            });

        return eventsCount[0].count;
    }

    async createEventImage(
        event_id,
        image_name,
        caption,
        language_id,
        is_active
    ) {
        await db('tbl_events_directory_image').insert({
            created_date_time: new Date(),
            classified_id: event_id,
            classified_image: image_name,
            image_caption: caption,
            language_id,
            is_active,
        });

        let image = await db('tbl_events_directory_image')
            .where({
                classified_id: event_id,
                classified_image: image_name,
                image_caption: caption,
                language_id,
                is_active,
            })
            .first();

        return image;
    }

    async getEventImage(id) {
        const event = await db('tbl_events_directory_image')
            .where({ id })
            .first();

        return event;
    }

    async getEventImages(event_id) {
        const event = await db('tbl_events_directory_image').where({
            classified_id: event_id,
        });

        return event;
    }

    async editEventImageStatus(id, is_active) {
        const event = await db('tbl_events_directory_image')
            .where({ id })
            .update({
                is_active,
            });
    }

    async deleteEventImage(id) {
        await db('tbl_events_directory_image').where({ id }).del();
    }

    async getSelectedEvent(language_id) {
        const events = await db('tbl_events_directory')
            .where({
                is_selected: '1',
                language_id,
            })
            .orderBy('id', 'desc');
        return events;
    }

    async getLastCreatedPost(language_id, limit) {
        const posts = await db('tbl_events_directory')
            .where({
                language_id,
                is_selected: '0',
            })
            .limit(limit)
            .orderBy('created_date_time', 'desc');
        return posts;
    }

    async clearSelected(language_id) {
        const response = await db('tbl_events_directory')
            .where({ is_selected: '1', language_id })
            .update({
                is_selected: '0',
            });
        return response;
    }

    async selectPosts(selectedIds) {
        const response = await db('tbl_events_directory')
            .whereIn('id', selectedIds)
            .update({
                is_selected: '1',
            });
        return response;
    }
}

module.exports = new EventsService();
