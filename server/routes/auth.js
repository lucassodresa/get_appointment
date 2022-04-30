const express = require('express');
const { SCHEMAS } = require('@get_appointment/shared');
const AuthController = require('../controllers/AuthController');
const Middleware = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get(
  '/validateToken',
  Middleware.validateToken,
  AuthController.validateToken
);

router.post(
  '/signup',
  upload.single('avatar'),
  Middleware.validateBody(SCHEMAS.USER.SIGNUP),
  AuthController.signUp
);
router.post(
  '/signin',
  Middleware.validateBody(SCHEMAS.USER.SIGNIN),
  AuthController.signIn
);

module.exports = router;
