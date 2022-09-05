const express = require('express');
const router = express.Router();
const NewsletterController = require('../controllers/NewsletterController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');

// Newsletter Routes

router.post('/', async(req, res) => {
    let data = await NewsletterController.createNewsletter(req, res)

    res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async(req, res) => {
    let data = await NewsletterController.deleteNewsletter(req, res)

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', authenticate, async(req, res) => {
    let data = await NewsletterController.getAllNewsletter(req, res)

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', authenticate, async(req, res) => {
    let data = await NewsletterController.getNewsletter(req, res)

    res.status(utils.getStatusCode(data)).json(data);
});

module.exports = router;