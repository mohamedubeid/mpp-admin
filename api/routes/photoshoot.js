const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PhotoshootsController = require('../controllers/PhotoshootController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/photoshoot')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Jewelry Posts Routes

router.post('/', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await PhotoshootsController.createPhotoshoot(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.put('/:id', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await PhotoshootsController.editPhotoshoot(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async(req, res) => {
  let data = await PhotoshootsController.deletePhotoshoot(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', async(req, res) => {
  let data = await PhotoshootsController.getAllPhotoshoot(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', async(req, res) => {
  let data = await PhotoshootsController.getPhotoshoot(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/slug/:slug', async(req, res) => {
  let data = await PhotoshootsController.getPhotoshootWithSlug(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.post('/:photoshoot_id/images', authenticate, upload.single("image"), async(req, res) => {
  let data = await PhotoshootsController.createPhotoshootImage(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.patch('/images/:id', authenticate, async(req, res) => {
  let data = await PhotoshootsController.editPhotoshootImageStatus(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/images/:id', authenticate, async(req, res) => {
  let data = await PhotoshootsController.deletePhotoshootImage(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:photoshoot_id/images', async(req, res) => {
  let data = await PhotoshootsController.getAllPhotoshootImages(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});


module.exports = router;