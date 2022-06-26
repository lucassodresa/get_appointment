const express = require('express');
const { SCHEMAS } = require('@get_appointment/shared');
const ServiceController = require('../controllers/ServiceController');
const Middleware = require('../middleware');
const {
  // isAdminOrCompanyUser,
  isCompanyUser
  // isAdminUser
} = require('../middleware');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});
const router = express.Router();

router.post(
  '/',
  isCompanyUser,
  upload.fields([{ name: 'photos' }]),
  Middleware.fileFieldsToBody,
  Middleware.validateBody(SCHEMAS.SERVICE.CREATE),
  ServiceController.postService
);
router.get('/', ServiceController.getServices);
// router.patch('/', isAdminUser, ServiceTypeController.postServiceType);

module.exports = router;
