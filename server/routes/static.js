const express = require('express');

const StaticController = require('../controllers/StaticController');
const router = express.Router();

router.get('/files/:key', StaticController.getFile);

module.exports = router;
