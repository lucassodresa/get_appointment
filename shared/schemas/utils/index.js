const checkIfFilesAreTooBig = (maxSize) => (files) => {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > maxSize) {
        valid = false;
      }
    });
  }
  return valid;
};

const checkIfFilesAreCorrectType = (files) => {
  let valid = true;
  const fileAllowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  if (files) {
    files.map((file) => {
      if (
        !fileAllowedTypes.includes(file?.type) &&
        !fileAllowedTypes.includes(file?.mimetype)
      ) {
        valid = false;
      }
    });
  }
  return valid;
};

module.exports = { checkIfFilesAreTooBig, checkIfFilesAreCorrectType };
