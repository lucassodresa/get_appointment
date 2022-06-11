// libraries
const { StatusCodes } = require('http-status-codes');

const { GLOBALS } = require('@get_appointment/shared');

const isAdminUser = async (req, res, next) => {
  try {
    const user = req._user;

    if (user.role === GLOBALS.USER.ROLES.ADMIN) next();
    else
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .jsend.fail({ message: 'Wrong user profile.' });
  } catch ({ errors }) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .jsend.fail({ message: `${errors}` });
  }
};

module.exports = isAdminUser;
