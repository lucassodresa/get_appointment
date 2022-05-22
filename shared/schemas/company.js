const yup = require('yup');
const {
  checkIfFilesAreTooBig,
  checkIfFilesAreCorrectType
} = require('./utils');

const SIGNUP = yup.object({
  avatar: yup
    .array()
    .nullable()
    .test(
      'is-correct-file',
      'The file size limit is 1mb',
      checkIfFilesAreTooBig(1)
    )
    .test(
      'is-big-file',
      'This field only accepts the follow extensions: (.jpg, .jpeg, .png)',
      checkIfFilesAreCorrectType
    )
    .max(1),
  background: yup
    .array()
    .nullable()
    .test(
      'is-correct-file',
      'The file size limit is 1mb',
      checkIfFilesAreTooBig(1)
    )
    .test(
      'is-big-file',
      'This field only accepts the follow extensions: (.jpg, .jpeg, .png)',
      checkIfFilesAreCorrectType
    )
    .max(1),
  photos: yup
    .array()
    .nullable()
    .test(
      'is-correct-file',
      'The file size limit is 1mb',
      checkIfFilesAreTooBig(1)
    )
    .test(
      'is-big-file',
      'This field only accepts the follow extensions: (.jpg, .jpeg, .png)',
      checkIfFilesAreCorrectType
    )
    .max(5),
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
    .of(yup.number().min(-180).max(180), yup.number().min(-90).max(90))
    .required(),
  password: yup.string().min(8).required()
});

const SIGNIN = yup.object({
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

module.exports = { SIGNUP, SIGNIN };
