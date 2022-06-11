const yup = require('yup');
const {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig
} = require('./utils');

const CREATE = yup.object({
  name: yup.string().max(255).required(),
  description: yup.string().max(1024).required(),
  typeId: yup.string().required('type is a required field'),
  price: yup.number().min(1).required(),
  duration: yup.number().min(5).max(90).required(),
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
});

module.exports = { CREATE };
