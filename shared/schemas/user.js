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
  name: yup.string().max(255).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

const SIGNIN = yup.object({
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).required()
});

module.exports = { SIGNUP, SIGNIN };
