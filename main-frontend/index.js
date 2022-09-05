const express = require('express');
const app = express();
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const English = require('./English');
const Arabic = require('./Arabic');
const utils = require('./utils');

app.use(express.static('public'));

app.use('/assets', express.static('assets'));
app.use('/ar/assets', express.static('ar/assets'));
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', English.Index);
app.get('/ar', Arabic.Index);

app.post('/subscribe', English.Subscribe);

app.get('/lifestyle', English.Lifestyle);
app.get('/lifestyle/details/:slug', English.LifestyleDetailsSlug);

app.get('/ar/lifestyle', Arabic.Lifestyle);
app.get('/ar/lifestyle/details/:slug', Arabic.LifestyleDetailsSlug);

app.get('/events', English.Events);
app.get('/events/details/:slug', English.EventsDetailsSlug);

app.get('/ar/events', Arabic.Events);
app.get('/ar/events/details/:slug', Arabic.EventsDetailsSlug);

app.get('/watches', English.Watches);
app.get('/watches/c/:slug', English.WatchesCategorySlug);
app.get('/watches/details/:slug', English.WatchesDetailsSlug);
app.get('/ar/watches', Arabic.Watches);
app.get('/ar/watches/c/:slug', Arabic.WatchesCategorySlug);
app.get('/ar/watches/details/:slug', Arabic.WatchesDetailsSlug);

app.get('/jewelry', English.Jewelry);
app.get('/jewelry/c/:slug', English.JewelryCategorySlug);
app.get('/jewelry/details/:slug', English.JewelryDetailsSlug);
app.get('/ar/jewelry', Arabic.Jewelry);
app.get('/ar/jewelry/c/:slug', Arabic.JewelryCategorySlug);
app.get('/ar/jewelry/details/:slug', Arabic.JewelryDetailsSlug);

app.get('/celebrities', English.Celebrities);
app.get('/celebrities/c/:slug', English.CelebritiesCategorySlug);
app.get('/celebrities/details/:slug', English.CelebritiesDetailsSlug);
app.get('/ar/celebrities', Arabic.Celebrities);
app.get('/ar/celebrities/c/:slug', Arabic.CelebritiesCategorySlug);
app.get('/ar/celebrities/details/:slug', Arabic.CelebritiesDetailsSlug);

app.get('/magazine', English.Magazine);
app.get('/magazine/details/:slug', English.MagazineDetailsSlug);

app.get('/ar/magazine', Arabic.Magazine);
app.get('/ar/magazine/details/:slug', Arabic.MagazineDetailsSlug);

app.get('/tv', English.TV);
app.get('/tv/c/:slug', English.TVCategorySlug);
app.get('/tv/details/:slug', English.TVDetailsSlug);
app.get('/ar/tv', Arabic.TV);
app.get('/ar/tv/c/:slug', Arabic.TVCategorySlug);
app.get('/ar/tv/details/:slug', Arabic.TVDetailsSlug);

app.get('/news', English.News);
app.get('/news/c/:slug', English.NewsCategorySlug);
app.get('/news/details/:slug', English.NewsDetailsSlug);
app.get('/ar/news', Arabic.News);
app.get('/ar/news/c/:slug', Arabic.NewsCategorySlug);
app.get('/ar/news/details/:slug', Arabic.NewsDetailsSlug);

app.get('/photoshoot', English.Photoshoot);
app.get('/photoshoot/details/:slug', English.PhotoshootDetailsSlug);

app.get('/ar/photoshoot', Arabic.Photoshoot);
app.get('/ar/photoshoot/details/:slug', Arabic.PhotoshootDetailsSlug);

app.get('/search/c', English.SearchCategory);
app.get('/ar/search/c', Arabic.SearchCategory);

app.get('/search', English.Search);
app.get('/ar/search', Arabic.Search);

app.get('/:slug', English.Slug);
app.get('/ar/:slug', Arabic.Slug);

// app.listen(process.env.MAIN_FE_PORT || 3000, () => {
//     console.log(
//         `Server is running on port ${process.env.MAIN_FE_PORT || 3000}`
//     );
// });
module.exports = app;
