const CelebrityService = require('../services/celebrity');

class CelebrityController {
    // Celebrity Category Functions
    
    async createCategory (req, res) {
        const user = req.user;

        let { parent_page, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;

        if (!title || !slug || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let categorySameSlug = await CelebrityService.getCategoryWithSlug(slug);
        if (categorySameSlug) return { error: "Category with that slug already exists, please choose another slug", statusCode: 400 }

        if(!parent_page) parent_page = 0

        let categories = await CelebrityService.getCategories(null, 1, null, 'all');

        let category;
        try {
            category = await CelebrityService.createCategory(parent_page, title, slug, description, meta_title, meta_keywords, meta_description, is_active, categories.length, language_id, user.id);
        } catch (error) {
            return { message: "Error creating category, please try again later", err: error, statusCode: 500 }
        }

        return { message: "Successfully created Celebrity Category!", category, statusCode: 200 }
    }

    async editCategory (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        let category = await CelebrityService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        let { parent_page, title, description, slug, meta_title, meta_description, meta_keywords, is_active, language_id } = req.body;

        if (!title || !slug || !language_id) return { error: "Please fill out all fields", statusCode: 400 }
        if(!parent_page) parent_page = 0

        let categorySameSlug = await CelebrityService.getCategoryWithSlug(slug);
        if (categorySameSlug && categorySameSlug.id != id) return { error: "Post with that slug already exists, please choose another slug", statusCode: 400 }

        category = null;
        try {
            category = await CelebrityService.editCategory(id, parent_page, title, slug, description, meta_title, meta_keywords, meta_description, is_active, language_id, user.id);
        } catch (error) {
            return { message: "Error editing category, please try again later", err: error, statusCode: 500 }
        }
        
        return { message: "Successfully edited Celebrity Category!", category, statusCode: 200 }
    }

    async deleteCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await CelebrityService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        try {
            await CelebrityService.deleteCategory(id);
        } catch (error) {
            return { message: "Error deleting category, please try again later", err: error, statusCode: 500 }
        }

        return { category, statusCode: 200 }
    }

    async getAllCategories(req, res) {
        let {language_id, limit, page, is_active} = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categories = await CelebrityService.getCategories(limit, page, language_id, is_active)

        let categoriesCount = await CelebrityService.getCategoriesCount(language_id, is_active);

        let pagesAvailable = Math.ceil(categoriesCount / limit);

        return { categories, pagesAvailable, statusCode: 200 }
    }

    async getCategory(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid category ID", statusCode: 400 }

        const category = await CelebrityService.getCategory(id);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 }
    }

    async getCategoryWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a category slug", statusCode: 400 }

        const category = await CelebrityService.getCategoryWithSlug(slug);

        if (!category) return { error: "Category not found", statusCode: 404 }

        return { category, statusCode: 200 }
    }

    // Celebrity Post Functions
    
    async createPost (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { categories, title, slug, short_description, description, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }
        if(categories && !Array.isArray(categories)) categories = [];
        if(!short_description) short_description = "";

        let postSameSlug = await CelebrityService.getPostWithSlug(slug);
        if (postSameSlug) return { error: "Post with that slug already exists, please choose another slug", statusCode: 400 }
        
        let post;
        try {
            post = await CelebrityService.createPost(title, slug, description, short_description, banner_image, meta_title, meta_tags, meta_description, is_active, language_id, user.id);
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
                await CelebrityService.addCategoriesToPost(formattedCategories);
            } catch (error) {
                return { message: "Error creating post categories, please try again later", err: error, statusCode: 500 }
            }
        }
    
        return { message: "Successfully created Celebrity Post!", post, statusCode: 200 }
    }

    async editPost (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        let post = await CelebrityService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        let banner_image = post.banner_image;
        if (req.file) banner_image = req.file.filename;

        let {  categories, title, slug, short_description, description, meta_title, meta_tags, meta_description, is_active, language_id } = req.body;

        if (!title || !slug || !meta_title || !meta_tags || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let postSameSlug = await CelebrityService.getPostWithSlug(slug);
        if (postSameSlug && postSameSlug.id != id) return { error: "Post with that slug already exists, please choose another slug", statusCode: 400 }

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
            post = await CelebrityService.editPost(id, title, description, slug, short_description, banner_image, meta_title, meta_description, meta_tags, is_active, formattedCategories, language_id, user.id);
        } catch (error) {
            return { message: "Error editing post, please try again later", err: error, statusCode: 500 }
        }
        
        return { message: "Successfully edited Celebrity Post!", post, statusCode: 200 }
    }

    async deletePost(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a category ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const post = await CelebrityService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        try {
            await CelebrityService.deletePost(id);
        } catch (error) {
            return { message: "Error deleting post, please try again later", err: error, statusCode: 500 }
        }

        return { post, statusCode: 200 }
    }

    async getAllPosts(req, res) {
        let {language_id, limit, page, category_id, is_active } = req.query;

        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        let categoryIDs = [];
        if(category_id) {
            let category = await CelebrityService.getCategory(category_id);
            
            if(category) {
                categoryIDs = [category.id];
            }

        }

        if (categoryIDs.length == 0) {
            let categories = await CelebrityService.getCategories(null, 1, language_id, is_active)

            if(categories && categories.length > 0) {
                categoryIDs = categories.map(category => category.id);
            }
        }
        let posts = await CelebrityService.getPosts(limit, page, language_id, categoryIDs, is_active);

        let postsCount = await CelebrityService.getPostsCount(language_id, categoryIDs, is_active);

        let pagesAvailable = Math.ceil(postsCount / limit);

        return { posts, pagesAvailable, statusCode: 200 }
    }

    async getPost(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const post = await CelebrityService.getPost(id);

        if (!post) return { error: "Post not found", statusCode: 404 }

        return { post, statusCode: 200 }
    }

    async getPostWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a post slug", statusCode: 400 }

        const post = await CelebrityService.getPostWithSlug(slug);

        if (!post) return { error: "Post not found", statusCode: 404 }

        return { post, statusCode: 200 }
    }

    async getPostCategories(req, res) {
        let { post_id } = req.params;

        post_id = parseInt(post_id);

        if (!post_id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof post_id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const categories = await CelebrityService.getPostCategories(post_id);

        return { categories, statusCode: 200 }
    }

    async createPostImage (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload an image", statusCode: 400 }

        let image_name = req.file.filename;

        let { post_id } = req.params;
        let { caption, is_active, language_id } = req.body;

        if (!post_id || !caption || !is_active || !language_id) return { error: "Please fill out all fields", statusCode: 400 }

        let post = await CelebrityService.getPost(post_id);
        if (!post) return { error: "Post not found", statusCode: 404 }

        let image;
        try {
            image = await CelebrityService.createPostImage(post_id, image_name, caption, language_id, is_active);
        } catch (error) {
            return { message: "Error adding post image, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully added Celebrity Image!", image, statusCode: 200 }
    }

    async getAllPostImages(req, res) {
        let { post_id } = req.params;
        let images = await CelebrityService.getPostImages(post_id);

        return { images, statusCode: 200 }
    }

    async editPostImageStatus(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        let { is_active } = req.body;
        if (!is_active) return { error: "Please fill out all fields", statusCode: 400 }

        if (!id) return { error: "Please provide a celebrity image ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid celebrity image ID", statusCode: 400 }

        const image = await CelebrityService.getPostImage(id);

        if (!image) return { error: "Celebrity image not found", statusCode: 404 }

        try {
            await CelebrityService.editPostImageStatus(id, is_active);
        } catch (error) {
            return { message: "Error editing celebrity image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    async deletePostImage(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a post ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid post ID", statusCode: 400 }

        const image = await CelebrityService.getPostImage(id);

        if (!image) return { error: "Celebrity image not found", statusCode: 404 }

        try {
            await CelebrityService.deletePostImage(id);
        } catch (error) {
            return { message: "Error deleting post image, please try again later", err: error, statusCode: 500 }
        }

        return { image, statusCode: 200 }
    }

    
}

module.exports = new CelebrityController();