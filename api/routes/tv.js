const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const TvController = require('../controllers/TvController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/tv')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Tv Videos Routes

router.post('/videos/', authenticate, upload.fields([
    { name: 'banner_image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
]), async(req, res) => {
  let data = await TvController.createVideo(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.put('/videos/:id', authenticate, upload.fields([
  { name: 'banner_image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]), async(req, res) => {
  let data = await TvController.editVideo(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.delete('/videos/:id', authenticate, async(req, res) => {
  let data = await TvController.deleteVideo(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/videos/', async(req, res) => {
  let data = await TvController.getAllVideos(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/videos/:id', async(req, res) => {
  let data = await TvController.getVideo(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/videos/slug/:slug', async(req, res) => {
  let data = await TvController.getVideoWithSlug(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/videos/categories/:video_id', async(req, res) => {
  let data = await TvController.getVideoCategories(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

// Tv Categories Routes

router.post('/categories', authenticate, async(req, res) => {
  let data = await TvController.createCategory(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.put('/categories/:id', authenticate, async(req, res) => {
  let data = await TvController.editCategory(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.delete('/categories/:id', authenticate, async(req, res) => {
  let data = await TvController.deleteCategory(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories', async(req, res) => {
  let data = await TvController.getAllCategories(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories/:id', async(req, res) => {
  let data = await TvController.getCategory(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories/slug/:slug', async(req, res) => {
  let data = await TvController.getCategoryWithSlug(req, res)
  
  return res.status(utils.getStatusCode(data)).json(data)
});


module.exports = router;