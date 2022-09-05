const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const MagazinesController = require('../controllers/MagazinesController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/magazines')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Jewelry Posts Routes

router.post('/', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await MagazinesController.createMagazine(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.put('/:id', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await MagazinesController.editMagazine(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/:id', authenticate, async(req, res) => {
  let data = await MagazinesController.deleteMagazine(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/', async(req, res) => {
  let data = await MagazinesController.getAllMagazine(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/:id', async(req, res) => {
  let data = await MagazinesController.getMagazine(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/slug/:slug', async(req, res) => {
  let data = await MagazinesController.getMagazineWithSlug(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

// Event Images Routes
router.post('/:magazine_id/images', authenticate, upload.single("image"), async(req, res) => {
  let data = await MagazinesController.createMagazineImage(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.patch('/images/:id', authenticate, async(req, res) => {
  let data = await MagazinesController.editMagazineImageStatus(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/images/:id', authenticate, async(req, res) => {
  let data = await MagazinesController.deleteMagazineImage(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/:magazine_id/images', async(req, res) => {
  let data = await MagazinesController.getAllMagazineImages(req, res);
  
  res.status(utils.getStatusCode(data)).send(data);
});

module.exports = router;