// libraries
const { StatusCodes } = require('http-status-codes');

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch ({ errors }) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .jsend.fail({ message: `${errors}` });
    }
  };
};

module.exports = validateBody;
