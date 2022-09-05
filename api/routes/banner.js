const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const BannerController = require('../controllers/BannerController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/banners');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.originalname
                .replace(' ', '-')
                .replace(path.extname(file.originalname), '') +
                '-' +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

// Banners Routes

router.post(
    '/',
    authenticate,
    upload.single('banner_image'),
    async (req, res) => {
        let data = await BannerController.createBanner(req, res);

        res.status(utils.getStatusCode(data)).send(data);
    }
);

router.put(
    '/:id',
    authenticate,
    upload.single('banner_image'),
    async (req, res) => {
        let data = await BannerController.editBanner(req, res);

        res.status(utils.getStatusCode(data)).send(data);
    }
);

router.delete('/:id', authenticate, async (req, res) => {
    let data = await BannerController.deleteBanner(req, res);

    res.status(utils.getStatusCode(data)).send(data);
});

router.get('/', async (req, res) => {
    let data = await BannerController.getAllBanners(req, res);

    res.status(utils.getStatusCode(data)).send(data);
});

router.get('/:id', async (req, res) => {
    let data = await BannerController.getBanner(req, res);

    res.status(utils.getStatusCode(data)).send(data);
});

router.post('/select/:id', async (req, res) => {
    const response = await BannerController.selectBanner(req, res);
    res.status(utils.getStatusCode(response)).json(response);
});

module.exports = router;
