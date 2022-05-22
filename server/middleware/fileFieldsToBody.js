const fileFieldsToBody = (req, res, next) => {
  const files = req.files;
  const body = req.body;
  const fields = Object.keys(files);
  fields.forEach((field) => (body[field] = files[field]));
  next();
};

module.exports = fileFieldsToBody;
