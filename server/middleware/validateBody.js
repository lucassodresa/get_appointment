// libraries
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch ({ errors }) {
      const file = req.file;
      if (file) await unlinkFile(file.path);

      return res
        .status(StatusCodes.BAD_REQUEST)
        .jsend.fail({ message: `${errors}` });
    }
  };
};

module.exports = validateBody;
