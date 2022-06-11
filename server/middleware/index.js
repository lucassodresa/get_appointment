const validateBody = require('./validateBody');
const validateToken = require('./validateToken');
const fileFieldsToBody = require('./fileFieldsToBody');
const isAdminUser = require('./isAdminUser');
const isCompanyUser = require('./isCompanyUser');
const isAdminOrCompanyUser = require('./isAdminOrCompanyUser');

module.exports = {
  validateBody,
  validateToken,
  fileFieldsToBody,
  isAdminUser,
  isCompanyUser,
  isAdminOrCompanyUser
};
