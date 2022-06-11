const express = require('express');
const ServiceTypeController = require('../controllers/ServiceTypeController');
const {
  isAdminOrCompanyUser,
  isCompanyUser
  // isAdminUser
} = require('../middleware');
const router = express.Router();

router.get('/', isAdminOrCompanyUser, ServiceTypeController.getServiceTypes);
router.post('/', isCompanyUser, ServiceTypeController.postServiceType);
// router.patch('/', isAdminUser, ServiceTypeController.postServiceType);

module.exports = router;
