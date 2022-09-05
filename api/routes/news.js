const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const NewsController = require('../controllers/NewsController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/banners')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })
// News Posts Routes

router.post('/posts/', authenticate, upload.single("banner_image"), async (req, res) => {
  let data = await NewsController.createPost(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.put('/posts/:id', authenticate, upload.single("banner_image"), async (req, res) => {
  let data = await NewsController.editPost(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/posts/:id', authenticate, async (req, res) => {
  let data = await NewsController.deletePost(req, res);

  res.status(utils.getStatusCode(data)).json(data); 
});

router.get('/posts/', async (req, res) => {
  let data = await NewsController.getAllPosts(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/:id', async (req, res) => {
  let data = await NewsController.getPost(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/slug/:slug', async(req, res) => {
  let data = await NewsController.getPostWithSlug(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

router.get('/posts/categories/:post_id', async (req, res) => {
  let data = await NewsController.getPostCategories(req, res);

  res.status(utils.getStatusCode(data)).json(data)
});

// Post Images Routes
router.post('/posts/:post_id/images', authenticate, upload.single("image"), async (req, res) => {
  let data = await NewsController.createPostImage(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.patch('/posts/images/:id', authenticate, async(req, res) => {
  let data = await NewsController.editPostImageStatus(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/posts/images/:id', authenticate, async (req, res) => {
  let data = await NewsController.deletePostImage(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/posts/:post_id/images', async (req, res) => {
  let data = await NewsController.getAllPostImages(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

// News Categories Routes

router.post('/categories', authenticate, async (req, res) => {
  let data = await NewsController.createCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.put('/categories/:id', authenticate, async (req, res) => {
  let data = await NewsController.editCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/categories/:id', authenticate, async (req, res) => {
  let data = await NewsController.deleteCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/categories', async (req, res) => {
  let data = await NewsController.getAllCategories(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/categories/:id', async (req, res) => {
  let data = await NewsController.getCategory(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/categories/slug/:slug', async (req, res) => {
  let data = await NewsController.getCategoryWithSlug(req, res);

  res.status(utils.getStatusCode(data)).json(data);
});


module.exports = router;