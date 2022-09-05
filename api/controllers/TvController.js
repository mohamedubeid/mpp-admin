const TvService = require('../services/tv');

class TvController {
    // Tv Category Functions
    
    async createCategory (req, res) {
        const user = req.user;

        let { title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;
        
        if (!title || !slug || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let categorySameSlug = await TvService.getCategoryWithSlug(slug);
        if (categorySameSlug) return { error: "Category with that slug already exists, please choose another slug", statusCode: 400 }

        const categories = await TvService.getCategories(null, null, null, 'all')

        let category;
        try {
            category = await TvService.createCategory(title, description, slug, meta_title, meta_description, meta_keywords, is_active, categories.length, language_id, user.id);
        } catch (error) {
            return { message: "Error creating category, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully created Tv Category!", category, statusCode: 200 }
    }

    async editCategory (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        let category = await TvService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        let { title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id} = req.body;

        if (!title || !slug || !language_id ) return { error: "Please fill out all fields", statusCode: 400 }

        let categorySameSlug = await TvService.getCategoryWithSlug(slug);
        if (categorySameSlug && categorySameSlug.id != id) return { error: "Category with that slug already exists, please choose another slug", statusCode: 400 }

        category = null;
        try {
            category = await TvService.editCategory(id, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing category, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Tv Category!", category, statusCode: 200 }
    }

    async deleteCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await TvService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        try {
            await TvService.deleteCategory(id);
        } catch (error) {
            return { message: "Error deleting category, please try again later", err: error, statusCode: 500 }
        }

        return { category, statusCode: 200 }
    }

    async getAllCategories(req, res) {
        let { language_id, limit, page, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categories = await TvService.getCategories(limit, page, language_id, is_active);

        let categoriesCount = await TvService.getCategoriesCount(language_id, is_active)

        let pagesAvailable = Math.ceil(categoriesCount / limit);

        return { categories, pagesAvailable, statusCode: 200 }
    }

    async getCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await TvService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 }
    }

    async getCategoryWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a category slug", statusCode: 400 }

        const category = await TvService.getCategoryWithSlug(slug);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 }
    }

    // Tv Video Functions
    
    async createVideo (req, res) {
        const user = req.user;

        if(!req.files) return { error: "Please upload a video and a banner image", statusCode: 400 }
        if (!req.files["banner_image"]) return { error: "Please upload a banner image", statusCode: 400 }
        if (!req.files["video"]) return { error: "Please upload a video", statusCode: 400 }

        let banner_image = req.files["banner_image"][0].filename;
        let video_file = req.files["video"][0].filename;

        let { categories, title, slug, meta_title, meta_description, meta_tags, is_active, language_id } = req.body;

        if (!title || !slug ||!meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }
        if(categories && !Array.isArray(categories)) return { error: "Please properly choose the categories", statusCode: 400 }

        let videoSameSlug = await TvService.getVideoWithSlug(slug);
        if (videoSameSlug) return { error: "Video with that slug already exists, please choose another slug", statusCode: 400 }

        let video;
        try {
            video = await TvService.createVideo(title, video_file, slug, banner_image, meta_title, meta_description, meta_tags, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error creating video, please try again later", err: error, statusCode: 500 }
        }

        if(categories && categories.length > 0) {
            let formattedCategories = [];
            for (let i = 0; i < categories.length; i++) {
                formattedCategories.push({ 
                    video_id: video.id,
                    category_id: categories[i],
                    created_date_time: 0,
                    created_by: user.id,
                    is_active,
                    is_deleted: 0,
                    language_id: 1 
                });
            }

            try {
                await TvService.addCategoriesToVideo(formattedCategories);
            } catch (error) {
                return { message: "Error creating video categories, please try again later", err: error, statusCode: 500 }
            }
        }
    
        return { message: "Successfully created Tv Video!", video, statusCode: 200 }
    }

    async editVideo (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a video ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid video ID", statusCode: 400 }

        let video = await TvService.getVideo(id);

        if (!video) return { error: "Video not found", statusCode: 404 }

        let banner_image = video.banner_image;
        if (req.file) banner_image = req.files["banner_image"][0].filename;

        let video_file = video.video_file;
        if (req.file) video_file = req.files["video"][0].filename;

        let { categories, title, slug, meta_title, meta_description, meta_tags, is_active, language_id } = req.body;

        if (!title || !slug ||!meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let videoSameSlug = await TvService.getVideoWithSlug(slug);
        if (videoSameSlug && videoSameSlug.id != id) return { error: "Video with that slug already exists, please choose another slug", statusCode: 400 }

        let formattedCategories = [];
        if (categories && categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                formattedCategories.push({ 
                    video_id: video.id,
                    category_id: categories[i],
                    created_date_time: 0,
                    created_by: user.id,
                    is_active,
                    is_deleted: 0,
                    language_id: 1 
                });
            }
        }

        video = null;
        try {
            video = await TvService.editVideo(id, formattedCategories, title, video_file, slug, banner_image, meta_title, meta_description, meta_tags, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing video, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Tv Video!", video, statusCode: 200 }
    }

    async deleteVideo(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid video ID", statusCode: 400 }

        const video = await TvService.getVideo(id);

        if (!video) return { error: "Video not found", statusCode: 404 }

        try {
            await TvService.deleteVideo(id);
        } catch (error) {
            return { message: "Error deleting video, please try again later", err: error, statusCode: 500 }
        }

        return { video, statusCode: 200 }
    }

    async getAllVideos(req, res) {
        let {language_id, limit, page, category_id, is_active} = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categoryIDs = []
        if(category_id) {
            let category = await TvService.getCategory(category_id);
            
            if(category) {
                categoryIDs = [category.id];
            }
        }

        if (categoryIDs.length == 0) {
            let categories = await TvService.getCategories(null, 1, language_id, is_active)

            if(categories && categories.length > 0) {
                categoryIDs = categories.map(category => category.id);
            }
        }

        let videos = await TvService.getVideos(limit, page, language_id, categoryIDs, is_active)

        let videosCount = await TvService.getVideosCount(language_id, categoryIDs, is_active);
        
        let pagesAvailable = Math.ceil(videosCount / limit);

        return { videos, pagesAvailable, statusCode: 200 }
    }

    async getVideo(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a video ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid video ID", statusCode: 400 }

        const video = await TvService.getVideo(id);

        if (!video) return { error: "Video not found", statusCode: 404 }

        return { video, statusCode: 200 }
    }

    async getVideoWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a video slug", statusCode: 400 }

        const video = await TvService.getVideoWithSlug(slug);

        if (!video) return { error: "Video not found", statusCode: 404 }

        return { video, statusCode: 200 }
    }

    async getVideoCategories(req, res) {
        let { video_id } = req.params;

        video_id = parseInt(video_id);

        if (!video_id) return { error: "Please provide a video ID", statusCode: 400 }
        if (typeof video_id !== "number") return { error: "Please provide a valid video ID", statusCode: 400 }

        const categories = await TvService.getVideoCategories(video_id);

        return { categories, statusCode: 200 }
    }

    
}

module.exports = new TvController();