const yup = require('yup');

const SIGNUP = yup.object({
  name: yup.string().max(255).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

const SIGNIN = yup.object({
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

module.exports = { SIGNUP, SIGNIN };
