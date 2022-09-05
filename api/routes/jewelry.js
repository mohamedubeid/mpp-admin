const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const JewelryController = require('../controllers/JewelryController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/jewelry')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Jewelry Posts Routes

router.post('/posts/', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await JewelryController.createPost(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.put('/posts/:id', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await JewelryController.editPost(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/posts/:id', authenticate, async(req, res) => {
  let data = await JewelryController.deletePost(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/posts/', async(req, res) => {
  let data = await JewelryController.getAllPosts(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/posts/:id', async(req, res) => {
  let data = await JewelryController.getPost(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/posts/slug/:slug', async(req, res) => {
  let data = await JewelryController.getPostWithSlug(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/posts/categories/:post_id', async(req, res) => {
  let data = await JewelryController.getPostCategories(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

// Post Images Routes
router.post('/posts/:post_id/images', authenticate, upload.single("image"), async(req, res) => {
  let data = await JewelryController.createPostImage(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.patch('/posts/images/:id', authenticate, async(req, res) => {
  let data = await JewelryController.editPostImageStatus(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/posts/images/:id', authenticate, async(req, res) => {
  let data = await JewelryController.deletePostImage(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/posts/:post_id/images', async(req, res) => {
  let data = await JewelryController.getAllPostImages(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

// Jewelry Categories Routes

router.post('/categories', authenticate, async(req, res) => {
  let data = await JewelryController.createCategory(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.put('/categories/:id', authenticate, async(req, res) => {
  let data = await JewelryController.editCategory(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.delete('/categories/:id', authenticate, async(req, res) => {
  let data = await JewelryController.deleteCategory(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/categories', async(req, res) => {
  let data = await JewelryController.getAllCategories(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/categories/:id', async(req, res) => {
  let data = await JewelryController.getCategory(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});

router.get('/categories/slug/:slug', async(req, res) => {
  let data = await JewelryController.getCategoryWithSlug(req, res);

  res.status(utils.getStatusCode(data)).send(data);
});


module.exports = router;