const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/me', UserController.getMe);
router.get('/', UserController.getUsers);

module.exports = router;
