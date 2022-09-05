const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const WatchController = require('../controllers/WatchController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/watches')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Watch Posts Routes

router.post('/posts/', authenticate, upload.fields([
  { name: 'banner_image', maxCount: 1 },
  { name: 'writter_image', maxCount: 1 }
]), async(req, res) => {
  let data = await WatchController.createPost(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.put('/posts/:id', authenticate, upload.fields([
  { name: 'banner_image', maxCount: 1 },
  { name: 'writter_image', maxCount: 1 }
]), async(req, res) => {
  let data = await WatchController.editPost(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.delete('/posts/:id', authenticate, async(req, res) => {
  let data = await WatchController.deletePost(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/', async(req, res) => {
  let data = await WatchController.getAllPosts(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/:id', async(req, res) => {
  let data = await WatchController.getPost(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/slug/:slug', async(req, res) => {
  let data = await WatchController.getPostWithSlug(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/categories/:post_id', async(req, res) => {
  let data = await WatchController.getPostCategories(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

// Post Images Routes
router.post('/posts/:post_id/images', authenticate, upload.single("image"), async(req, res) => {
  let data = await WatchController.createPostImage(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.patch('/posts/images/:id', authenticate, async(req, res) => {
  let data = await WatchController.editPostImageStatus(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.delete('/posts/images/:id', authenticate, async(req, res) => {
  let data = await WatchController.deletePostImage(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/:post_id/images', async(req, res) => {
  let data = await WatchController.getAllPostImages(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

// Watch Categories Routes

router.post('/categories', authenticate, async(req, res) => {
  let data = await WatchController.createCategory(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.put('/categories/:id', authenticate, async(req, res) => {
  let data = await WatchController.editCategory(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.delete('/categories/:id', authenticate, async(req, res) => {
  let data = await WatchController.deleteCategory(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories', async(req, res) => {
  let data = await WatchController.getAllCategories(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories/:id', async(req, res) => {
  let data = await WatchController.getCategory(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories/slug/:slug', async(req, res) => {
  let data = await WatchController.getCategoryWithSlug(req, res);
  
  res.status(utils.getStatusCode(data)).json(data)
});


module.exports = router;