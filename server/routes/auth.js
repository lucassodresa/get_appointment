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
  '/signup/company',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
    { name: 'photos' }
  ]),
  Middleware.validateBody(SCHEMAS.COMPANY.SIGNUP),
  AuthController.signUpCompany
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
