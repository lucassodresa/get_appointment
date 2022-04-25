require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw 'No token provided.';

    const parts = authHeader.split(' ');

    if (parts.length !== 2) throw 'Token error.';

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme) || !token) throw 'Malformed token.';

    const tokenUser = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(tokenUser.id);

    if (!user) throw 'Token invalid.';
    if (!user.active) throw 'User inactive.';

    req._user = user;
    return next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).jsend.fail({ message: error });
  }
};

module.exports = validateToken;
