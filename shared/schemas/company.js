const yup = require('yup');

const SIGNUP = yup.object({
  name: yup.string().max(255).required(),
  nif: yup
    .string()
    .matches(/^[0-9]+$/)
    .length(9)
    .required(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/)
    .length(9)
    .required(),
  email: yup.string().email().max(255).required(),
  location: yup
    .array()
    .of(yup.number().min(0).max(180), yup.number().min(0).max(90)),
  password: yup.string().min(8).required()
});

const SIGNIN = yup.object({
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

module.exports = { SIGNUP, SIGNIN };
