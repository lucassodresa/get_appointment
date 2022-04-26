require('dotenv').config();
const fs = require('fs');
const { S3 } = require('aws-sdk');

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

const getFileStream = (fileKey) => {
  const downloadParams = { Key: fileKey, Bucket: bucketName };
  s3.getObject(downloadParams).createReadStream();
};

module.exports = { uploadFile, getFileStream };
