const { StatusCodes } = require('http-status-codes');

const ServiceTypeModel = require('../models/ServiceTypeModel');

const postServiceType = async (req, res) => {
  try {
    const body = req.body;
    const { name } = body;

    const nameAlreadyExists = await ServiceTypeModel.findOne({ name });

    if (nameAlreadyExists)
      return res.status(StatusCodes.CONFLICT).jsend.fail({
        message: 'Service type alreadty exists.'
      });
    const serviceType = new ServiceTypeModel({ name });

    if (body.description) {
      // send email to admin with description
    }

    await serviceType.save();

    return res.status(StatusCodes.OK).jsend.success({
      message: 'Service type creation was requested with success.'
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const getServiceTypes = async (req, res) => {
  try {
    const { active } = req.query;

    const services = await ServiceTypeModel.find({
      ...(active !== undefined && { active })
    });

    if (!services.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .jsend.fail({ message: 'service not founded' });
    }

    return res.status(StatusCodes.OK).jsend.success({
      services
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

// const patchServiceType = async (req, res) => {
//   try {
//     const body = req.body;

//     if (nameAlreadyExists)
//       return res.status(StatusCodes.CONFLICT).jsend.success({
//         message: 'Service type alreadty exists.'
//       });
//     const serviceType = new ServiceTypeModel({ name });

//     if (body.description) {
//       // send email to admin with description
//     }

//     await serviceType.save();

//     return res.status(StatusCodes.OK).jsend.success({
//       message: 'Service type creation was requested with success.'
//     });
//   } catch (error) {
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .jsend.error({ message: error });
//   }
// };

module.exports = { postServiceType, getServiceTypes };
