const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const UserModel = require('../models/UserModel');
const { generateToken } = require('../utils/authentication');
const { uploadFile, unlinkFile, removeTemporaryFiles } = require('../utils/s3');
const CompanyModel = require('../models/CompanyModel');
const { sendMail } = require('../utils/mail');
const {
  generateEmailCompanySignUp,
  generateEmailCompanySignUpAlertToAdmin
} = require('../constants/emailTemplates');
require('dotenv').config();
const { ADMIN_EMAIL } = process.env;

const signUp = async (req, res) => {
  let body, files;
  try {
    body = req.body;
    const avatar = body.avatar?.[0];
    files = req.files;

    const alreadyExistUserEmail = await UserModel.findOne({
      email: body.email
    });
    if (alreadyExistUserEmail) {
      removeTemporaryFiles(files);
      return res
        .status(StatusCodes.CONFLICT)
        .jsend.fail({ message: 'Email already exist.' });
    }

    if (avatar) {
      const result = await uploadFile(avatar);
      await unlinkFile(avatar.path);

      if (result.Key) body.avatar = result.Key;
    }
    const user = new UserModel({ ...body });

    await user.save();

    return res.status(StatusCodes.CREATED).jsend.success({
      message: 'User created!'
    });
  } catch (error) {
    removeTemporaryFiles(files);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const signUpCompany = async (req, res) => {
  let body, files;
  try {
    body = req.body;
    files = req.files;

    // 1-
    // verify if user already exist and register
    // user using email and password

    const alreadyExistUserEmail = await UserModel.findOne({
      email: body.email
    });
    if (alreadyExistUserEmail) {
      removeTemporaryFiles(files);
      return res
        .status(StatusCodes.CONFLICT)
        .jsend.fail({ message: 'Email already exist.' });
    }

    // 2- verify if nif already exist

    const alreadyExistCompanyNif = await CompanyModel.findOne({
      nif: body.nif
    });
    if (alreadyExistCompanyNif) {
      removeTemporaryFiles(files);
      return res
        .status(StatusCodes.CONFLICT)
        .jsend.fail({ message: 'Nif already exist.' });
    }

    // 3- send images to s3 bucket

    let uploadAvatarPromise, uploadBackgroundPromise, uploadPhotosPromise;
    const avatarFile = body?.avatar?.[0];

    if (avatarFile) {
      uploadAvatarPromise = uploadFile(avatarFile).then((result) => {
        if (result.Key) body.avatar = result.Key;
        unlinkFile(avatarFile.path);
      });
    }

    const backgroundFile = body?.background?.[0];
    if (backgroundFile) {
      uploadBackgroundPromise = uploadFile(backgroundFile).then((result) => {
        if (result.Key) body.background = result.Key;
        unlinkFile(backgroundFile.path);
      });
    }

    const photosFileArray = body?.photos;
    if (photosFileArray) {
      const uploadPhotosPromisesArray = photosFileArray.map((file) =>
        uploadFile(file)
      );

      uploadPhotosPromise = Promise.all(uploadPhotosPromisesArray).then(
        (photos) => {
          if (photos) {
            const photosKeys = photos.map((photo) => photo.Key);
            body.photos = photosKeys;
            photosFileArray.forEach((photo) => unlinkFile(photo.path));
          }
        }
      );
    }

    await Promise.all([
      uploadAvatarPromise,
      uploadBackgroundPromise,
      uploadPhotosPromise
    ]);

    const { name, email, password, nif, phone, location } = body;

    // 4-
    // create user
    const user = new UserModel({
      name,
      email,
      password,
      ...(body.avatar && { avatar: body.avatar }),
      role: 3
    });

    // 5-
    // create company with status "pending"
    const company = new CompanyModel({
      name,
      adminId: user.id,
      ...(body.avatar && { avatar: body.avatar }),
      ...(body.background && { background: body.background }),
      nif,
      phone,
      location: { type: 'Point', coordinates: location },
      ...(body.photos && { photos: body.photos })
    });

    // 6-
    // send email to user and to admin

    const companyParams = generateEmailCompanySignUp(name);
    const adminParams = generateEmailCompanySignUpAlertToAdmin(name);

    const promises = [
      user.save(),
      company.save(),
      sendMail(email, companyParams.subject, companyParams.message),
      sendMail(ADMIN_EMAIL, adminParams.subject, adminParams.message)
    ];

    await Promise.all(promises);

    return res.status(StatusCodes.CREATED).jsend.success({
      message: 'User created!'
    });
  } catch (error) {
    removeTemporaryFiles(files);
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

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .jsend.fail({ message: 'Email not found.' });

    if (!user.active)
      return res
        .status(StatusCodes.FORBIDDEN)
        .jsend.fail({ message: 'User inactive.' });

    if (!(await bcrypt.compare(body.password, user.password)))
      return res
        .status(StatusCodes.FORBIDDEN)
        .jsend.fail({ message: 'Wrong credentials.' });

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

module.exports = { signUp, signUpCompany, signIn, validateToken };
