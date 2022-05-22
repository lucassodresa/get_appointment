// libraries
const { StatusCodes } = require('http-status-codes');
const { removeTemporaryFiles } = require('../utils/s3');

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch ({ errors }) {
      const files = req.files;
      removeTemporaryFiles(files);

      return res
        .status(StatusCodes.BAD_REQUEST)
        .jsend.fail({ message: `${errors}` });
    }
  };
};

module.exports = validateBody;
