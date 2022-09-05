const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');

// Newsletter Routes

router.post('/', async(req, res) => {
    let data = await ContactController.createContact(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async(req, res) => {
    let data = await ContactController.deleteContact(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', authenticate, async(req, res) => {
    let data = await ContactController.getAllContact(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', authenticate, async(req, res) => {
    let data = await ContactController.getContact(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

module.exports = router;