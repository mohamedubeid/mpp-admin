const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const LifestyleController = require('../controllers/LifestyleController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/events')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Jewelry Posts Routes

router.post('/', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await LifestyleController.createLifestyle(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.put('/:id', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await LifestyleController.editLifestyle(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/:id', authenticate, async(req, res) => {
  let data = await LifestyleController.deleteLifestyle(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/', async(req, res) => {
  let data = await LifestyleController.getAllLifestyle(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/:id', async(req, res) => {
  let data = await LifestyleController.getLifestyle(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/slug/:slug', async(req, res) => {
  let data = await LifestyleController.getLifestyleWithSlug(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.post('/:lifestyle_id/images', authenticate, upload.single("image"), async(req, res) => {
  let data = await LifestyleController.createLifestyleImage(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.patch('/images/:id', authenticate, async(req, res) => {
  let data = await LifestyleController.editLifestyleImageStatus(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/images/:id', authenticate, async(req, res) => {
  let data = await LifestyleController.deleteLifestyleImage(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/:lifestyle_id/images', async(req, res) => {
  let data = await LifestyleController.getAllLifestyleImages(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

module.exports = router;