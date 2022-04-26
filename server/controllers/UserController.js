const { StatusCodes } = require('http-status-codes');

const UserModel = require('../models/UserModel');
const { uploadFile } = require('../utils/s3');

const getMe = async (req, res) => {
  try {
    const { _id, name, email, role, avatar } = req._user;
    return res.status(StatusCodes.OK).jsend.success({
      user: { _id, name, email, role, avatar }
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ active: true });

    if (!users.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .jsend.fail({ message: 'user not founded' });
    }

    return res.status(StatusCodes.OK).jsend.success({
      users
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const editAvatar = async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    // eslint-disable-next-line no-console
    console.log(result);

    return res.status(StatusCodes.OK).jsend.success({
      ok: true
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

module.exports = { getMe, getUsers, editAvatar };
