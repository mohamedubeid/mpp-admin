const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SlidersController = require('../controllers/SlidersController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/slider')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Jewelry Posts Routes

router.post('/', authenticate, upload.single("banner_image"), async(req, res) => {
    let data = await SlidersController.createSlider(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.put('/:id', authenticate, upload.single("banner_image"), async(req, res) => {
    let data = await SlidersController.editSlider(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async(req, res) => {
    let data = await SlidersController.deleteSlider(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', async(req, res) => {
    let data = await SlidersController.getAllSlider(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', async(req, res) => {
    let data = await SlidersController.getSlider(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

module.exports = router;