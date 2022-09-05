const WatchService = require('../services/watches');

class WatchController {
    // Watch Category Functions
    
    async createCategory (req, res) {
        const user = req.user;

        let { title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;

        if (!title || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let category;
        try {
            category = await WatchService.createCategory(title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error creating category, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully created Watch Category!", category, statusCode: 200 }
    }

    async editCategory (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        let category = await WatchService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        let { title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;

        if (!title || !slug || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        category = null;
        try {
            category = await WatchService.editCategory(id, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing category, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Watch Category!", category, statusCode: 200 }
    }

    async deleteCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await WatchService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        try {
            await WatchService.deleteCategory(id);
        } catch (error) {
            return { message: "Error deleting category, please try again later", err: error, statusCode: 500 }
        }

        return { category, statusCode: 200 }
    }

    async getAllCategories(req, res) {
        let { limit, page, language_id, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = "all";

        const categories = await WatchService.getCategories(limit, page, language_id, is_active)

        let categoriesCount = await WatchService.getCategoriesCount(language_id, is_active)

        let pagesAvailable = Math.ceil(categoriesCount / limit);

        return { categories, pagesAvailable, statusCode: 200 }
    }

    async getCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await WatchService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 }
    }

    async getCategoryWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a category slug", statusCode: 400 }

        const category = await WatchService.getCategoryWithSlug(slug);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 }
    }

    // Watch Post Functions
    
    async createPost (req, res) {
        const user = req.user;

        if (!req.files["banner_image"]) return { error: "Please upload a banner image", statusCode: 400 }
        if (!req.files["writter_image"]) return { error: "Please upload a writter image", statusCode: 400 }

        let banner_image = req.files["banner_image"][0].filename;
        let writter_image = req.files["writter_image"][0].filename;

        let { categories, title, description, slug, writter_name, writter_position, meta_title, meta_description, meta_tags, icon_of_the_week, is_active } = req.body;

        if (!title || !meta_title || !meta_tags || !writter_name || !writter_position || !writter_image) return { error: "Please fill out all fields", statusCode: 400 }
        if(categories && !Array.isArray(categories)) return { error: "Please properly choose the categories", statusCode: 400 }

        let post;
        try {
            post = await WatchService.createPost(title, description, slug, banner_image, writter_name, writter_position, writter_image, meta_title, meta_description, meta_tags, icon_of_the_week, is_active, user.id);
        } catch (error) {
            return { message: "Error creating post, please try again later", err: error, statusCode: 500 }
        }

        if(categories && categories.length > 0) {
            let formattedCategories = [];
            for (let i = 0; i < categories.length; i++) {
                formattedCategories.push({ 
                    post_id: post.id,
                    category_id: categories[i],
                    created_date_time: 0,
                    created_by: user.id,
                    is_active,
                    is_deleted: 0,
                    language_id: 1 
                });
            }

            try {
                await WatchService.addCategoriesToPost(formattedCategories);
            } catch (error) {
                return { message: "Error creating post categories, please try again later", err: error, statusCode: 500 }
            }
        }
    
        return { message: "Successfully created Watch Post!", post, statusCode: 200 }
    }

    async editPost (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        let post = await WatchService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        let banner_image = post.banner_image;
        if (req.files["banner_image"]) {
            banner_image = req.files["banner_image"][0].filename;
        }
        
        let writter_image = post.writter_image;
        if (req.files["writter_image"]) {
            writter_image = req.files["writter_image"][0].filename
        }

        let { categories, title, description, slug, writter_name, writter_position, meta_title, meta_description, meta_tags, icon_of_the_week, is_active, } = req.body;

        if (!title || !slug || !is_active ) return { error: "Please fill out all fields", statusCode: 400 }

        let formattedCategories = [];
        if (categories && categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                formattedCategories.push({ 
                    post_id: post.id,
                    category_id: categories[i],
                    created_date_time: 0,
                    created_by: user.id,
                    is_active,
                    is_deleted: 0,
                    language_id: 1 
                });
            }
        }

        post = null;
        try {
            post = await WatchService.editPost(id, formattedCategories, title, description, slug, banner_image, writter_name, writter_position, writter_image, meta_title, meta_description, meta_tags, icon_of_the_week, is_active, user.id);
        } catch (error) {
            return { message: "Error editing post, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited Watch Post!", post, statusCode: 200 }
    }

    async deletePost(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const post = await WatchService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        try {
            await WatchService.deletePost(id);
        } catch (error) {
            return { message: "Error deleting post, please try again later", err: error, statusCode: 500 }
        }

        return { post, statusCode: 200 }
    }

    async getAllPosts(req, res) {
        let { limit, page, language_id, category_id, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categoryIDs = []
        if(category_id) {
            let category = await WatchService.getCategory(category_id);
            
            if(category) {
                categoryIDs = [category.id];
            }
        }

        if (categoryIDs.length == 0) {
            let categories = await WatchService.getCategories(null, 1, language_id, is_active)

            if(categories && categories.length > 0) {
                categoryIDs = categories.map(category => category.id);
            }
        }

        const posts = await WatchService.getPosts(limit, page, language_id, categoryIDs, is_active)

        let postsCount = await WatchService.getPostsCount(language_id, categoryIDs, is_active);

        let pagesAvailable = Math.ceil(postsCount / limit);

        return { posts, pagesAvailable, statusCode: 200 }
    }

    async getPost(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const post = await WatchService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        return { post, statusCode: 200 }
    }

    async getPostWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a post slug", statusCode: 400 }

        const post = await WatchService.getPostWithSlug(slug);

        if (!post) return { error: "Post not found", statusCode: 404 }

        return { post, statusCode: 200 }
    }

    async getPostCategories(req, res) {
        let { post_id } = req.params;

        post_id = parseInt(post_id);

        if (!post_id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof post_id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const categories = await WatchService.getPostCategories(post_id);

        return { categories, statusCode: 200 }
    }

    async createPostImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { post_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!post_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let post = await WatchService.getPost(post_id);
        if (!post) return { error: "Post not found", statusCode: 404 }

        let image;
        try {
            image = await WatchService.createPostImage(post_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding post image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added Watch Image!", image, statusCode: 200 }
    }

    async getAllPostImages(req, res) {
        let { post_id } = req.params;
        let images = await WatchService.getPostImages(post_id);

        return { images, statusCode: 200 }
    }

    async editPostImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a watch image ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid watch image ID", statusCode: 400 }

        const image = await WatchService.getPostImage(id);

        if (!image) return { error: "Watch image not found", statusCode: 404 }

        try {
            await WatchService.editPostImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error editing watch image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deletePostImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const image = await WatchService.getPostImage(id);

        if (!image) return { error: "Watch image not found", statusCode: 404 }

        try {
            await WatchService.deletePostImage(id);
        } catch (error) {
            return { message: "Error deleting post image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }
}

module.exports = new WatchController();