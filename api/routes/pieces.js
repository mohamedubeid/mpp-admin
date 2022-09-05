const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PiecesController = require('../controllers/PiecesController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/pieces')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.replace(" ", "-").replace(path.extname(file.originalname), "") + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// Jewelry Posts Routes

router.post('/', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await PiecesController.createPiece(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.put('/:id', authenticate, upload.single("banner_image"), async(req, res) => {
  let data = await PiecesController.editPiece(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async(req, res) => {
  let data = await PiecesController.deletePiece(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', async(req, res) => {
  let data = await PiecesController.getAllPieces(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', async(req, res) => {
  let data = await PiecesController.getPiece(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

router.get('/slug/:slug', async(req, res) => {
  let data = await PiecesController.getPieceWithSlug(req, res) 
  
  res.status(utils.getStatusCode(data)).json(data);
});

module.exports = router;