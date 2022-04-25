// libraries
const express = require('express');
const Middleware = require('../middleware');
const router = express.Router();

// imports
const auth = require('./auth');
// const users = require('./users');
// public routes
router.use('/auth', auth);

router.use(Middleware.validateToken);

// private routes
// router.use('/users', users);

module.exports = router;
