const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const UserModel = require('../models/UserModel');
const { generateToken } = require('../utils/authentication');

const signUp = async (req, res) => {
  try {
    const body = req.body;

    const alreadyExistUserEmail = await UserModel.findOne({
      email: body.email
    });
    if (alreadyExistUserEmail) {
      return res
        .status(StatusCodes.CONFLICT)
        .jsend.fail({ message: 'Email already exist.' });
    }

    const user = new UserModel({ ...body });

    await user.save();

    return res.status(StatusCodes.CREATED).jsend.success({
      message: 'User created!'
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const signIn = async (req, res) => {
  try {
    const body = req.body;

    const user = await UserModel.findOne({ email: body.email }).select(
      '+password'
    );

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .jsend.fail({ message: 'Email not found.' });
    }

    if (!user.active) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .jsend.fail({ message: 'User inactive.' });
    }

    if (!(await bcrypt.compare(body.password, user.password))) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .jsend.fail({ message: 'Wrong credentials.' });
    }

    user.password = undefined;

    const token = generateToken({ id: user.id }, '8h');

    return res.status(StatusCodes.OK).jsend.success({
      message: 'Success sign in!',
      user,
      token
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const validateToken = async (req, res) => {
  return res.status(StatusCodes.OK).jsend.success({
    message: 'Valid token.'
  });
};

module.exports = { signUp, signIn, validateToken };
