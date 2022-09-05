const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/SettingsController');
const authenticate = require('../middleware/jwt');
const utils = require('../utils/utils');

// Settings Routes

router.post('/', authenticate, async(req, res) => {
    let data = await SettingsController.createSetting(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.put('/:id', authenticate, async(req, res) => {
    let data = await SettingsController.editSetting(req, res);

    res.status(utils.getStatusCode(data)).json(data);
})

router.delete('/:id', authenticate, async(req, res) => {
    let data = await SettingsController.deleteSetting(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/', async(req, res) => {
    let data = await SettingsController.getAllSetting(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/:id', async(req, res) => {
    let data = await SettingsController.getSetting(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

router.get('/title/:title', async(req, res) => {
    let data = await SettingsController.getSettingFromTitle(req, res);

    res.status(utils.getStatusCode(data)).json(data);
});

module.exports = router;