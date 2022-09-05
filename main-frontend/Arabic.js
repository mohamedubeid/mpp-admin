const CelebrityController = require("../api/controllers/CelebrityController");
const EventsController = require("../api/controllers/EventsController");
const JewelryController = require("../api/controllers/JewelryController");
const LifestyleController = require("../api/controllers/LifestyleController");
const MagazinesController = require("../api/controllers/MagazinesController");
const NewsController = require("../api/controllers/NewsController");
const PhotoshootController = require("../api/controllers/PhotoshootController");
const TvController = require("../api/controllers/TvController");
const WatchController = require("../api/controllers/WatchController");
const OtherController = require("../api/controllers/OtherController");
const CMSPageController = require("../api/controllers/CMSPageController");
const utils = require("./utils");

class Arabic {
    async Index(req, res) {
        req.query.language_id = 2
        req.query.limit = 6;
        req.query.is_active = '1';

        let [watchPosts, jewelryPosts, celebrityPosts, tvPosts] = await Promise.all([
            WatchController.getAllPosts(req, res),
            JewelryController.getAllPosts(req, res),
            CelebrityController.getAllPosts(req, res),
            TvController.getAllVideos(req, res),
        ]);

        req.query.limit = 4;
        let [newsPosts, lifestylePosts, eventPosts] =
            await Promise.all([
                NewsController.getAllPosts(req, res),
                LifestyleController.getAllLifestyle(req, res),
                EventsController.getAllEvent(req, res),
            ]);

        req.query.limit = 6;
        let magazinePosts = await MagazinesController.getAllMagazine(req, res)

        req.query.limit = 5;
        let photoshootPosts = await PhotoshootController.getAllPhotoshoot(req, res)

        if (!watchPosts.posts.length || !jewelryPosts.posts.length || !celebrityPosts.posts.length || !tvPosts.videos.length || !newsPosts.posts.length || !lifestylePosts.lifestyles.length || !eventPosts.events.length || !magazinePosts.magazines.length || !photoshootPosts.photoshoots.length) {
            res.redirect("/")
            return
        }

        let metaData = {
            title: "Home || MPP ME",
            description: "Home || MPP ME",
            keywords: "home,mpp,mppme",
        }

        res.render("index-ar", {
            layout: "layout-ar",
            watchPosts: watchPosts.posts,
            jewelryPosts: jewelryPosts.posts,
            celebrityPosts: celebrityPosts.posts,
            tvPosts: tvPosts.videos,
            newsPosts: newsPosts.posts,
            lifestylePosts: lifestylePosts.lifestyles,
            magazinePosts: magazinePosts.magazines,
            eventPosts: eventPosts.events,
            photoshootPosts: photoshootPosts.photoshoots,
            metaData: metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async Lifestyle(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        let metaData = {
            title: "Lifestyle || MPP ME",
            description: "Lifestyle || MPP ME",
            keywords: "lifestyle,mpp,mppme",
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let lifestylePosts = await LifestyleController.getAllLifestyle(req, res);

        if (lifestylePosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/lifestyle")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeLifestylePosts = await (await LifestyleController.getAllLifestyle(req, res)).lifestyles

        let pagination = utils.getPaginationArray(
            lifestylePosts.pagesAvailable,
            currentPage
        );

        res.render("lifestyle-ar", {
            layout: "layout-ar",
            lifestylePosts: lifestylePosts.lifestyles,
            pagination: pagination,
            currentPage,
            metaData,
            firstThreeLifestylePosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async LifestyleDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await LifestyleController.getLifestyleWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/lifestyle');
        }

        let metaData = {
            title: `${post.lifestyle.meta_title} || MPP ME`,
            description: post.lifestyle.meta_desc,
            keywords: `${post.lifestyle.meta_keywords},mpp,mppme`,
        }

        res.render("post", {
            layout: "layout-ar",
            post: post.lifestyle,
            categories: [],
            uploadsFolderPath: "events",
            title: "Lifestyle",
            pathname: "lifestyle",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async Events(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        let metaData = {
            title: "Events || MPP ME",
            description: "Events || MPP ME",
            keywords: "events,mpp,mppme",
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let eventPosts = await EventsController.getAllEvent(req, res);
        
        if (eventPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/events")
        }
        
        let currentPage = req.query.page
        
        req.query.limit = 3
        req.query.page = 1
        let firstThreeEventPosts = await (await EventsController.getAllEvent(req, res)).events

        let pagination = utils.getPaginationArray(
            eventPosts.pagesAvailable,
            currentPage
        );
        
        res.render("events-ar", {
            layout: "layout-ar",
            eventPosts: eventPosts.events,
            pagination: pagination,
            currentPage,
            metaData,
            firstThreeEventPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async EventsDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await EventsController.getEventWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/events');
        }

        let metaData = {
            title: `${post.event.meta_title} || MPP ME`,
            description: post.event.meta_desc,
            keywords: `${post.event.meta_keywords},mpp,mppme`,
        }

        res.render("post", {
            layout: "layout-ar",
            post: post.event,
            categories: [],
            uploadsFolderPath: "events",
            title: "Events",
            pathname: "events",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async Watches(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;

        let metaData = {
            title: "Watches || MPP ME",
            description: "Watches || MPP ME",
            keywords: "watches,mpp,mppme",
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let watchPosts = await WatchController.getAllPosts(req, res)

        if (watchPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/watches")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeWatchPosts = await (await WatchController.getAllPosts(req, res)).posts

        req.query.limit = 6
        let categories = await WatchController.getAllCategories(req, res)

        let pagination = utils.getPaginationArray(
            watchPosts.pagesAvailable,
            currentPage
        );

        res.render("watches-ar", {
            layout: "layout-ar",
            watchPosts: watchPosts.posts,
            pagination: pagination,
            currentPage: currentPage,
            metaData,
            categories: categories.categories,
            firstThreeWatchPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            popularPosts: await utils.getPopularPosts(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res)
        });
    }

    async WatchesCategorySlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let category = await WatchController.getCategoryWithSlug(req, res);

        if (!category.category) {
            res.redirect('/ar/watches');
        }

        let metaData = {
            title: `${category.category.meta_title} || MPP ME`,
            description: category.category.meta_desc,
            keywords: `${category.category.meta_keywords},mpp,mppme`,
        }

        req.query.category_id = category.id;
        let watchPosts = await WatchController.getAllPosts(req, res);

        if (watchPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/watches")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeWatchPosts = await (await WatchController.getAllPosts(req, res)).posts

        let pagination = utils.getPaginationArray(
            watchPosts.pagesAvailable,
            currentPage
        );

        res.render("watches-ar", {
            layout: "layout-ar",
            categoryTitle: category.category.title,
            watchPosts: watchPosts.posts,
            pagination: pagination,
            currentPage,
            categories: [],
            metaData,
            firstThreeWatchPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res),
        });
    }

    async WatchesDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await WatchController.getPostWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/watches');
        }

        let metaData = {
            title: `${post.post.meta_title} || MPP ME`,
            description: post.post.meta_desc,
            keywords: `${post.post.meta_keywords},mpp,mppme`,
        }

        req.params.post_id = post.post.id;
        let categories = await WatchController.getPostCategories(req, res);

        res.render("post", {
            layout: "layout-ar",
            post: post.post,
            categories: categories.categories,
            uploadsFolderPath: "watches",
            title: "Watches",
            pathname: "watches",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async Jewelry(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        let metaData = {
            title: "Jewellry || MPP ME",
            description: "Jewellry || MPP ME",
            keywords: "jewellry,mpp,mppme",
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let jewelryPosts = await JewelryController.getAllPosts(req, res);
        console.log(jewelryPosts.posts.length)
        if (jewelryPosts.pagesAvailable < req.query.page && req.query.page == 1) {
            res.redirect("/jewelry")
        } else if (jewelryPosts.pagesAvailable < req.query.page ){
            res.redirect("/ar/jewelry")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeJewelryPosts = await (await JewelryController.getAllPosts(req, res)).posts

        let categories = await JewelryController.getAllCategories(req, res);

        let pagination = utils.getPaginationArray(
            jewelryPosts.pagesAvailable,
            currentPage
        );

        res.render("jewelry-ar", {
            layout: "layout-ar",
            categoryTitle: "Jewellery",
            jewelryPosts: jewelryPosts.posts,
            pagination: pagination,
            currentPage,
            categories: categories.categories,
            metaData,
            firstThreeJewelryPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async JewelryCategorySlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let category = await JewelryController.getCategoryWithSlug(req, res);

        if (!category.category) {
            res.redirect('/ar/jewelry');
        }

        let metaData = {
            title: `${category.category.meta_title} || MPP ME`,
            description: category.category.meta_desc,
            keywords: `${category.category.meta_keywords},mpp,mppme`,
        }

        req.query.category_id = category.id;
        let jewelryPosts = await JewelryController.getAllPosts(req, res);

        if (jewelryPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/jewelry")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeJewelryPosts = await (await JewelryController.getAllPosts(req, res)).posts

        let pagination = utils.getPaginationArray(
            jewelryPosts.pagesAvailable,
            currentPage
        );

        res.render("jewelry-ar", {
            layout: "layout-ar",
            categoryTitle: category.category.title,
            jewelryPosts: jewelryPosts.posts,
            pagination: pagination,
            currentPage,
            categories: [],
            metaData,
            firstThreeJewelryPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res),
        });
    }

    async JewelryDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await JewelryController.getPostWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/jewelry');
        }

        let metaData = {
            title: `${post.post.meta_title} || MPP ME`,
            description: post.post.meta_desc,
            keywords: `${post.post.meta_keywords},mpp,mppme`,
        }

        req.params.post_id = post.post.id;
        let categories = await JewelryController.getPostCategories(req, res);

        res.render("post", {
            layout: "layout-ar",
            post: post.post,
            categories: categories.categories,
            uploadsFolderPath: "jewelry",
            title: "Jewellery",
            pathname: "jewelry",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async Celebrities(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;

        let metaData = {
            title: `Celebrities || MPP ME`,
            description: `Celebrities || MPP ME`,
            keywords: `celebrities,mpp,mppme`,
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let celebrityPosts = await CelebrityController.getAllPosts(req, res)

        if (celebrityPosts.pagesAvailable < req.query.page && req.query.page == 1) {
            res.redirect("/celebrities")
            return
        } else if (celebrityPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/celebrities")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeCelebrityPosts = await (await CelebrityController.getAllPosts(req, res)).posts

        let categories = await (await CelebrityController.getAllCategories(req, res)).categories

        let pagination = utils.getPaginationArray(
            celebrityPosts.pagesAvailable,
            currentPage
        );

        res.render("celebrities-ar", {
            layout: "layout-ar",
            celebrityPosts: celebrityPosts.posts,
            pagination: pagination,
            currentPage,
            categories,
            metaData,
            firstThreeCelebrityPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async CelebritiesCategorySlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let category = await CelebrityController.getCategoryWithSlug(req, res);

        if (!category.category) {
            res.redirect('/ar/celebrities');
        }

        let metaData = {
            title: `${category.category.meta_title} || MPP ME`,
            description: category.category.meta_desc,
            keywords: `${category.category.meta_keywords},mpp,mppme`,
        }

        req.query.category_id = category.id;
        let celebrityPosts = await CelebrityController.getAllPosts(req, res);

        if (celebrityPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/celebrities")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeCelebrityPosts = await (await CelebrityController.getAllPosts(req, res)).posts

        let pagination = utils.getPaginationArray(
            celebrityPosts.pagesAvailable,
            currentPage
        );

        res.render("celebrities-ar", {
            layout: "layout-ar",
            categoryTitle: category.category.title,
            celebrityPosts: celebrityPosts.posts,
            pagination: pagination,
            currentPage,
            categories: [],
            metaData,
            firstThreeCelebrityPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res),
        });
    }

    async CelebritiesDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await CelebrityController.getPostWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/celebrities');
        }

        let metaData = {
            title: `${post.post.meta_title} || MPP ME`,
            description: post.post.meta_desc,
            keywords: `${post.post.meta_keywords},mpp,mppme`,
        }

        req.params.post_id = post.post.id;
        let categories = await CelebrityController.getPostCategories(req, res);

        res.render("post", {
            layout: "layout-ar",
            post: post.post,
            categories: categories.categories,
            uploadsFolderPath: "celebrity",
            title: "Celebrities",
            pathname: "celebrities",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async Magazine(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        let metaData = {
            title: `Magazines || MPP ME`,
            description: `Magazines || MPP ME`,
            keywords: `magazines,mpp,mppme`,
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let magazinePosts = await MagazinesController.getAllMagazine(req, res);

        if (magazinePosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/magazine")
        }

        let pagination = utils.getPaginationArray(
            magazinePosts.pagesAvailable,
            req.query.page
        );

        res.render("magazine-ar", {
            layout: "layout-ar",
            magazinePosts: magazinePosts.magazines,
            pagination: pagination,
            currentPage: req.query.page,
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async MagazineDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await MagazinesController.getMagazineWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/magazine');
        }

        let metaData = {
            title: `${post.magazine.meta_title} || MPP ME`,
            description: post.magazine.meta_desc,
            keywords: `${post.magazine.meta_keywords},mpp,mppme`,
        }

        res.render("post", {
            layout: "layout-ar",
            post: post.magazine,
            categories: [],
            uploadsFolderPath: "magazines",
            title: "Magazines",
            pathname: "magazine",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async TV(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        let metaData = {
            title: `TV || MPP ME`,
            description: `TV || MPP ME`,
            keywords: `tv,mpp,mppme`,
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let tvPosts = await TvController.getAllVideos(req, res);

        req.query.limit = 6;
        let categories = await TvController.getAllCategories(req, res)

        if (tvPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/tv")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeTVPosts = await (await TvController.getAllVideos(req, res)).videos

        let pagination = utils.getPaginationArray(
            tvPosts.pagesAvailable,
            currentPage
        );

        res.render("tv-ar", {
            layout: "layout-ar",
            tvPosts: tvPosts.videos,
            pagination: pagination,
            currentPage,
            metaData,
            categories: categories.categories,
            firstThreeTVPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async TVCategorySlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let category = await TvController.getCategoryWithSlug(req, res);

        if (!category.category) {
            res.redirect('/ar/tv');
        }

        let metaData = {
            title: `${category.category.meta_title} || MPP ME`,
            description: category.category.meta_desc,
            keywords: `${category.category.meta_keywords},mpp,mppme`,
        }

        req.query.category_id = category.category.id;
        let tvPosts = await TvController.getAllVideos(req, res);

        if (tvPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/tv")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeTVPosts = await (await TvController.getAllVideos(req, res)).posts

        let pagination = utils.getPaginationArray(
            tvPosts.pagesAvailable,
            currentPage
        );

        res.render("tv-ar", {
            layout: "layout-ar",
            categoryTitle: category.category.title,
            tvPosts: tvPosts.posts,
            pagination: pagination,
            currentPage,
            categories: [],
            metaData,
            firstThreeTVPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res),
        });
    }

    async TVDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await TvController.getVideoWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/tv');
        }

        let metaData = {
            title: `${post.video.meta_title || ""} || MPP ME`,
            description: post.video.meta_desc,
            keywords: `${post.video.meta_keywords},mpp,mppme`,
        }

        req.params.video_id = post.video.id;
        let categories = await TvController.getVideoCategories(req, res);

        res.render("video", {
            layout: "layout-ar",
            post: post.video,
            categories: categories.categories,
            uploadsFolderPath: "tv",
            title: "TV",
            pathname: "tv",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async News(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        let metaData = {
            title: `News || MPP ME`,
            description: `News || MPP ME`,
            keywords: `news,mpp,mppme`,
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let newsPosts = await NewsController.getAllPosts(req, res);

        if (newsPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/news")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeNewsPosts = await (await NewsController.getAllPosts(req, res)).posts

        let pagination = utils.getPaginationArray(
            newsPosts.pagesAvailable,
            currentPage
        );

        res.render("news-ar", {
            layout: "layout-ar",
            newsPosts: newsPosts.posts,
            pagination: pagination,
            currentPage,
            metaData,
            firstThreeNewsPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async NewsCategorySlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let category = await NewsController.getCategoryWithSlug(req, res);

        if (!category.category) {
            res.redirect('/ar/news');
        }

        let metaData = {
            title: `${category.category.meta_title} || MPP ME`,
            description: category.category.meta_desc,
            keywords: `${category.category.meta_keywords},mpp,mppme`,
        }

        req.query.category_id = category.category.id;
        let newsPosts = await NewsController.getAllPosts(req, res);

        if (newsPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/news")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreeNewsPosts = await (await NewsController.getAllPosts(req, res)).posts

        let pagination = utils.getPaginationArray(
            newsPosts.pagesAvailable,
            currentPage
        );

        res.render("news-ar", {
            layout: "layout-ar",
            categoryTitle: category.category.title,
            newsPosts: newsPosts.posts,
            pagination: pagination,
            currentPage,
            categories: [],
            metaData,
            firstThreeNewsPosts,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res),
        });
    }

    async NewsDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await NewsController.getPostWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/news');
        }

        console.log(post.post)
        let metaData = {
            title: `${post.post.meta_title || ""} || MPP ME`,
            description: post.post.meta_desc,
            keywords: `${post.post.meta_keywords},mpp,mppme`,
        }

        req.params.post_id = post.post.id;
        let categories = await NewsController.getPostCategories(req, res);

        res.render("post", {
            layout: "layout-ar",
            post: post.post,
            categories: categories.categories,
            uploadsFolderPath: "banners",
            title: "News",
            pathname: "news",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async Photoshoot(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;

        let metaData = {
            title: `Photoshoots || MPP ME`,
            description: `Photoshoots || MPP ME`,
            keywords: `photoshoots,mpp,mppme`,
        }

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let photoshootPosts = await PhotoshootController.getAllPhotoshoot(req, res);

        if (photoshootPosts.pagesAvailable < req.query.page) {
            res.redirect("/ar/photoshoot")
        }

        let currentPage = req.query.page

        req.query.limit = 3
        req.query.page = 1
        let firstThreePhotoshootPosts = await (await PhotoshootController.getAllPhotoshoot(req, res)).photoshoots

        let pagination = utils.getPaginationArray(
            photoshootPosts.pagesAvailable,
            currentPage
        );

        res.render("photoshoot-ar", {
            layout: "layout-ar",
            photoshootPosts: photoshootPosts.photoshoots,
            pagination: pagination,
            currentPage,
            firstThreePhotoshootPosts,
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });
    }

    async PhotoshootDetailsSlug(req, res) {
        req.query.language_id = 2
        req.query.limit = 8;
        req.query.is_active = '1';

        if (
            !req.query.page ||
            !parseInt(req.query.page) ||
            parseInt(req.query.page) <= 1
        ) {
            req.query.page = 1;
        } else {
            req.query.page = parseInt(req.query.page);
        }

        let post = await PhotoshootController.getPhotoshootWithSlug(req, res);

        if (post.statusCode != 200) {
            res.redirect('/ar/photoshoot');
        }

        let metaData = {
            title: `${post.photoshoot.meta_title} || MPP ME`,
            description: post.photoshoot.meta_desc,
            keywords: `${post.photoshoot.meta_keywords},mpp,mppme`,
        }

        res.render("post", {
            layout: "layout-ar",
            post: post.photoshoot,
            categories: [],
            uploadsFolderPath: "photoshoot",
            title: "Photoshoots",
            pathname: "photoshoot",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res),
            popularPosts: await utils.getPopularPosts(req, res)
        });

    }

    async SearchCategory(req, res) {
        req.query.language_id = 2
        if (!req.query.query || req.query.query == '') {
            res.redirect("/ar/")
        }

        let metaData = {
            title: `Search || MPP ME`,
            description: `Search || MPP ME`,
            keywords: `search,mpp,mppme`,
        }

        let categories = await OtherController.searchCategories(req, res)

        res.render("searchCategories-ar", {
            layout: "layout-ar",
            categories: categories.categories,
            newsCategories: await utils.getNewsCategories(req, res),
            metaData,
            socialMediaLinks: await utils.getSocialMediaLinks(req, res)
        })
    }

    async Search(req, res) {
        req.query.language_id = 2
        if (!req.query.query || req.query.query == '') {
            res.redirect("/ar/")
        }

        let metaData = {
            title: `Search || MPP ME`,
            description: `Search || MPP ME`,
            keywords: `search,mpp,mppme`,
        }

        req.query.limit = 4;
        req.query.is_active = '1';
        let posts = await OtherController.searchPosts(req, res)

        res.render("search-ar", {
            layout: "layout-ar",
            posts: posts.posts,
            newsCategories: await utils.getNewsCategories(req, res),
            metaData,
            socialMediaLinks: await utils.getSocialMediaLinks(req, res)
        })
    }

    async Slug(req, res) {
        req.query.language_id = 2
        req.query.is_active = '1';

        let cms_page = await CMSPageController.getCmspageWithSlug(req, res);
        let metaData = {
            title: `MPP ME`,
            description: `MPP ME`,
            keywords: `mpp,mppme`,
        }

        if (cms_page.statusCode == 200) {
            metaData = {
                title: `${cms_page.cmspage.meta_title || ""} || MPP ME`,
                description: `${cms_page.cmspage.meta_desc || ""} || MPP ME`,
                keywords: `${cms_page.cmspage.meta_keywords || ""},mpp,mppme`,
            }

            res.render('cms_page', {
                layout: "layout-ar",
                'cms_page': cms_page.cmspage,
                metaData,
                newsCategories: await utils.getNewsCategories(req, res),
                socialMediaLinks: await utils.getSocialMediaLinks(req, res)
            })
        }

        res.status(404).render('404-ar', {
            layout: "layout-ar",
            metaData,
            newsCategories: await utils.getNewsCategories(req, res),
            socialMediaLinks: await utils.getSocialMediaLinks(req, res)
        });
    }

}

module.exports = new Arabic();