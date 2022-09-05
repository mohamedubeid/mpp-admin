const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const EventsController = require('../controllers/EventsController');
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

router.post('/', authenticate, upload.single("banner_image"), async (req, res) => {
    let data = await EventsController.createEvent(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.put('/:id', authenticate, upload.single("banner_image"), async(req, res) => {
    let data = await EventsController.editEvent(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async(req, res) => {
    let data = await EventsController.deleteEvent(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', async(req, res) => {
    let data = await EventsController.getAllEvent(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', async(req, res) => {
    let data = await EventsController.getEvent(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/slug/:slug', async(req, res) => {
    let data = await EventsController.getEventWithSlug(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

// Event Images Routes
router.post('/:event_id/images', authenticate, upload.single("image"), async(req, res) => {
    let data = await EventsController.createEventImage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.patch('/images/:id', authenticate, async(req, res) => {
    let data = await EventsController.editEventImageStatus(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/images/:id', authenticate, async(req, res) => {
    let data = await EventsController.deleteEventImage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:event_id/images', async(req, res) => {
    let data = await EventsController.getAllEventImages(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

module.exports = router;