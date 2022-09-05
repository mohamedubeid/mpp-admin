const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
// const authenticate = require('../middleware/jwt');

router.post('/', UserController.createUser);

router.post('/signin', UserController.signInUser);

module.exports = router;