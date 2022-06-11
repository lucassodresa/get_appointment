// libraries
const express = require('express');
const Middleware = require('../middleware');
const router = express.Router();

// imports
const auth = require('./auth');
const users = require('./users');
const serviceTypes = require('./serviceTypes');
const services = require('./services');

// public routes
router.use('/auth', auth);

router.use(Middleware.validateToken);

// private routes
router.use('/users', users);
router.use('/service-types', serviceTypes);
router.use('/services', services);

module.exports = router;
