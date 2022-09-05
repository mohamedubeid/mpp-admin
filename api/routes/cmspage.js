const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const CMSPageController = require('../controllers/CMSPageController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');

// Jewelry Posts Routes

router.post('/', authenticate, async(req, res) => {
    let data = await CMSPageController.createCmspage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.put('/:id', authenticate, async(req, res) => {
    let data = await CMSPageController.editCmspage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data);
});

router.delete('/:id', authenticate, async (req, res) => {
    let data = await CMSPageController.deleteCmspage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data); 
});

router.get('/', async(req, res) => {
    let data = await CMSPageController.getAllCmspage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data)
});

router.get('/:id', async(req, res) => {
    let data = await CMSPageController.getCmspage(req, res);
    
    res.status(utils.getStatusCode(data)).json(data)
});

router.get('/slug/:slug', async(req, res) => {
    let data = await CMSPageController.getCmspageWithSlug(req, res);
    
    res.status(utils.getStatusCode(data)).json(data)
});

module.exports = router;