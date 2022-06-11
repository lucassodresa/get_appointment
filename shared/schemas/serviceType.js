const yup = require('yup');

const CREATE = yup.object({
  name: yup.string().max(255).required(),
  description: yup.string().max(1024)
});

module.exports = { CREATE };
