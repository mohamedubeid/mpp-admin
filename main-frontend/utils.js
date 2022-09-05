const CelebrityController = require("../api/controllers/CelebrityController");
const NewsController = require("../api/controllers/NewsController");
const SettingsController = require("../api/controllers/SettingsController");
const WatchController = require("../api/controllers/WatchController");

class Utils {
    async getNewsCategories(req, res) {
        req.query.limit = undefined
        req.query.is_active = '1';

        return await (await NewsController.getAllCategories(req, res)).categories
    }

    async getPopularPosts(req, res) {
        req.query.limit = 1
        req.query.is_active = '1';

        let celebrity = await (await CelebrityController.getAllPosts(req, res)).posts[0]
        let news = await (await NewsController.getAllPosts(req, res)).posts[0]
        let watch = await (await WatchController.getAllPosts(req, res)).posts[0]

        let posts = []
        if (celebrity) {
            celebrity.uploadsDirName = "celebrity"
            celebrity.URLPath = "celebrities"
            posts.push(celebrity)
        }
        
        if (news) {
            news.uploadsDirName = "banners"
            news.URLPath = "news"
            posts.push(news)
        }

        if (watch) {
            watch.uploadsDirName = "watches"
            watch.URLPath = "watches"
            posts.push(watch)
        }

        return posts
    }

    async getSocialMediaLinks(req, res) {

        req.params.title = "FACEBOOK_LINK"
        let facebookLink = await SettingsController.getSettingFromTitle(req, res)

        req.params.title = "INSTAGRAM_LINK"
        let instagramLink = await SettingsController.getSettingFromTitle(req, res)

        req.params.title = "TWITTER_LINK"
        let twitterLink = await SettingsController.getSettingFromTitle(req, res)

        req.params.title = "ANDROID_LINK"
        let androidLink = await SettingsController.getSettingFromTitle(req, res)

        req.params.title = "APPLE_LINK"
        let appleLink = await SettingsController.getSettingFromTitle(req, res)

        // ANDROID_LINK

        return {
            facebookLink,
            instagramLink,
            twitterLink,
            androidLink,
            appleLink
        }
    }

    getPaginationArray(pagesAvailable, currentPage) {
        // Get 1 page before, current page and 1 page after
        let pages = [];

        if(pagesAvailable <= 1) {
            return [1];
        }

        if(currentPage == 1) {
            pages.push(1)
            if (pagesAvailable >= 2) pages.push(2) 
            if (pagesAvailable >= 3) pages.push(3) 
        } else {
            pages.push(currentPage-1)
            pages.push(currentPage)
            if (pagesAvailable > currentPage+1) pages.push(currentPage+1) 
        }
        

        return pages;
    }
}

module.exports = new Utils();