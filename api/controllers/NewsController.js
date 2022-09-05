const NewsService = require('../services/news');

class NewsController {
    // News Category Functions
    
    async createCategory (req, res) {
        const user = req.user;

        let { title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;

        if (!title ) return { error: "Please fill out all fields", statusCode: 400 }

        let category;
        try {
            category = await NewsService.createCategory(title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error creating category, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully created News Category!", category, statusCode: 200 }
    }

    async editCategory (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        let category = await NewsService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        let { title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;

        if (!title ) return { error: "Please fill out all fields", statusCode: 400 }

        category = null;
        try {
            category = await NewsService.editCategory(id, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing category, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited News Category!", category, statusCode: 200 }
    }

    async deleteCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await NewsService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        try {
            await NewsService.deleteCategory(id);
        } catch (error) {
            return { message: "Error deleting category, please try again later", err: error, statusCode: 500 }
        }

        return { category, statusCode: 200 }
    }

    async getAllCategories(req, res) {
        let { language_id, page, limit, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categories = await NewsService.getCategories(limit, page, language_id, is_active)

        let categoriesCount = await NewsService.getCategoriesCount(language_id, is_active);

        let pagesAvailable = Math.ceil(categoriesCount / limit);

        return { categories, pagesAvailable, statusCode: 200 }
    }

    async getCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await NewsService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 };
    }

    async getCategoryWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a category slug", statusCode: 400 }

        const category = await NewsService.getCategoryWithSlug(slug);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 };
    }

    // News Post Functions
    
    async createPost (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        if (!banner_image) return { error: "Please upload a banner image", statusCode: 400 }

        let { categories, title, slug, short_description, description, additional_description, date, meta_title, meta_description, meta_tags, sort_order, is_active, language_id } = req.body;

        if (!title || !date || !meta_title || !meta_tags || !sort_order ) return { error: "Please fill out all fields", statusCode: 400 }
        if(categories && !Array.isArray(categories)) return { error: "Please properly choose the categories", statusCode: 400 }

        let post;
        try {
            post = await NewsService.createPost(title, slug, short_description, description, additional_description, date, banner_image, meta_title, meta_description, meta_tags, sort_order, is_active, language_id, user.id);
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
                await NewsService.addCategoriesToPost(formattedCategories);
            } catch (error) {
                return { message: "Error creating post categories, please try again later", err: error, statusCode: 500 }
            }
        }
    
        return { message: "Successfully created News Post!", post, statusCode: 200 }
    }

    async editPost (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        let post = await NewsService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;
        if (!banner_image) {
            banner_image = post.banner_image;
        }

        let { categories, title, slug, short_description, description, additional_description, date, meta_title, meta_description, meta_tags, sort_order, is_active, language_id } = req.body;

        if (!title || !date || !meta_title || !meta_tags || !sort_order ) return { error: "Please fill out all fields", statusCode: 400 }

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
            post = await NewsService.editPost(id, formattedCategories, title, slug, short_description, description, additional_description, date, banner_image, meta_title, meta_description, meta_tags, sort_order, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing post, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited News Post!", post, statusCode: 200 }
    }

    async deletePost(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const post = await NewsService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        try {
            await NewsService.deletePost(id);
        } catch (error) {
            return { message: "Error deleting post, please try again later", err: error, statusCode: 500 }
        }

        return { post, statusCode: 200 }
    }

    async getAllPosts(req, res) {
        let { language_id, page, limit, category_id, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categoryIDs = []
        if(category_id) {
            let category = await NewsService.getCategory(category_id);
            
            if(category) {
                categoryIDs = [category.id];
            }
        }

        if (categoryIDs.length == 0) {
            let categories = await NewsService.getCategories(null, 1, language_id, is_active);

            if(categories && categories.length > 0) {
                categoryIDs = categories.map(category => category.id);
            }
        }

        let posts = await NewsService.getPosts(limit, page, language_id, categoryIDs, is_active)

        let postsCount = await NewsService.getPostsCount(language_id, categoryIDs, is_active);

        let pagesAvailable = Math.ceil(postsCount / limit);

        return { posts, pagesAvailable, statusCode: 200 };
    }

    async getPost(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 };
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const post = await NewsService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 };

        return { post, statusCode: 200 };
    }

    async getPostWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a post slug", statusCode: 400 };

        const post = await NewsService.getPostWithSlug(slug);

        if (!post) return { error: "Post not found", statusCode: 404 };

        return { post, statusCode: 200 };
    }

    async getPostCategories(req, res) {
        let { post_id } = req.params;

        post_id = parseInt(post_id);

        if (!post_id) return { error: "Please provide a post ID", statusCode: 400 };
        if (typeof post_id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const categories = await NewsService.getPostCategories(post_id);

        return { categories, statusCode: 200 };
    }

    async createPostImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { post_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!post_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let post = await NewsService.getPost(post_id);
        if (!post) return { error: "Post not found", statusCode: 404 }

        let image;
        try {
            image = await NewsService.createPostImage(post_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding post image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added News Image!", image, statusCode: 200 }
    }

    async getAllPostImages(req, res) {
        let { post_id } = req.params;
        let images = await NewsService.getPostImages(post_id);

        return { images, statusCode: 200 }
    }

    async editPostImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a news image ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid news image ID", statusCode: 400 }

        const image = await NewsService.getPostImage(id);

        if (!image) return { error: "News image not found", statusCode: 404 }

        try {
            await NewsService.editPostImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error editing news image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deletePostImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const image = await NewsService.getPostImage(id);

        if (!image) return { error: "News image not found", statusCode: 404 }

        try {
            await NewsService.deletePostImage(id);
        } catch (error) {
            return { message: "Error deleting post image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }    
}

module.exports = new NewsController();