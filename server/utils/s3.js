require('dotenv').config();
const fs = require('fs');
const { S3 } = require('aws-sdk');
const util = require('util');

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } =
  process.env;

const s3 = new S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  };

  return s3.upload(uploadParams).promise();
};

const getSignedUrl = (Key) => {
  const signedUrlParams = { Key, Bucket: AWS_BUCKET_NAME, Expires: 60 * 5 };
  const url = s3.getSignedUrl('getObject', signedUrlParams);
  return url;
};

const unlinkFile = util.promisify(fs.unlink);

const removeTemporaryFiles = (files) => {
  if (files) {
    const fields = Object.keys(files);
    fields.forEach((field) => {
      const fieldFiles = files[field];
      fieldFiles.forEach((file) => unlinkFile(file.path));
    });
  }
};

module.exports = { uploadFile, getSignedUrl, unlinkFile, removeTemporaryFiles };
