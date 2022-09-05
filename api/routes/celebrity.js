const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const CelebrityController = require('../controllers/CelebrityController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/celebrity')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Celebrity Posts Routes

router.post('/posts/', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await CelebrityController.createPost(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.put('/posts/:id', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await CelebrityController.editPost(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/posts/:id', authenticate, async(req, res) => {
  let data = await CelebrityController.deletePost(req, res);

  res.status(utils.getStatusCode(data)).json(data); 
});

router.get('/posts/', async(req, res) => {
  let data = await CelebrityController.getAllPosts(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/:id', async (req, res) => {
  let data = await CelebrityController.getPost(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/slug/:slug', async(req, res) => {
  let data = await CelebrityController.getPostWithSlug(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/categories/:post_id', async (req, res) => {
  let data = await CelebrityController.getPostCategories(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

// Post Images Routes
router.post('/posts/:post_id/images', authenticate, upload.single("image"), async(req, res) => {
  let data = await CelebrityController.createPostImage(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.patch('/posts/images/:id', authenticate, async(req, res) => {
  let data = await CelebrityController.editPostImageStatus(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/posts/images/:id', authenticate, async(req, res) => {
  let data = await CelebrityController.deletePostImage(req, res);

  res.status(utils.getStatusCode(data)).json(data); 
});

router.get('/posts/:post_id/images', async(req, res) => {
  let data = await CelebrityController.getAllPostImages(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

// Celebrity Categories Routes

router.post('/categories', authenticate, async(req, res) => {
  let data = await CelebrityController.createCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.put('/categories/:id', authenticate, async(req, res) => {
  let data = await CelebrityController.editCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/categories/:id', authenticate, async(req, res) => {
  let data = await CelebrityController.deleteCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data); 
});

router.get('/categories', async(req, res) => {
  let data = await CelebrityController.getAllCategories(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories/:id', async(req, res) => {
  let data = await CelebrityController.getCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/categories/slug/:slug', async(req, res) => {
  let data = await CelebrityController.getCategoryWithSlug(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});


module.exports = router;