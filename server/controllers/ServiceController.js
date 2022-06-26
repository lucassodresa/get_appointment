const { StatusCodes } = require('http-status-codes');
const CompanyModel = require('../models/CompanyModel');
const { GLOBALS } = require('@get_appointment/shared');

const ServiceModel = require('../models/ServiceModel');
const ServiceTypeModel = require('../models/ServiceTypeModel');
const { removeTemporaryFiles, uploadFile, unlinkFile } = require('../utils/s3');

const postService = async (req, res) => {
  let files;
  try {
    const user = req._user;
    const body = req.body;
    const { name, description, typeId, price, duration } = body;

    //verify if service type exists

    const serviceType = await ServiceTypeModel.findById(typeId);

    if (!serviceType?.active) {
      removeTemporaryFiles(files);
      return res.status(StatusCodes.NOT_FOUND).jsend.fail({
        message: 'Service type not found.'
      });
    }

    //verify if company exist
    const company = await CompanyModel.findOne({
      adminId: user._id
    });

    // if (company?.status !== GLOBALS.COMPANY.STATUS.ACTIVE) {
    //   removeTemporaryFiles(files);
    //   return res.status(StatusCodes.NOT_FOUND).jsend.fail({
    //     message: 'Company not found.'
    //   });
    // }
    let uploadPhotosPromise;
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
    await Promise.all([uploadPhotosPromise]);

    const service = new ServiceModel({
      name,
      description,
      price,
      duration,
      typeId,
      companyId: company._id,
      ...(body.photos && { photos: body.photos })
    });

    await service.save();

    return res.status(StatusCodes.OK).jsend.success({
      message: 'Service created with success.'
    });
  } catch (error) {
    removeTemporaryFiles(files);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .jsend.error({ message: error });
  }
};

const getServices = async (req, res) => {
  try {
    // const { active } = req.query;

    let services;

    if (req._user.role === GLOBALS.USER.ROLES.COMPANY) {
      const company = await CompanyModel.findOne({ adminId: req._user._id });

      services = await ServiceModel.find({
        companyId: company.id
        // ...(active !== undefined && { active })
      });
    } else {
      let filter, polygon;
      filter = req.query?.filter;
      if (filter) filter = JSON.parse(filter);

      if (filter?.polygon) polygon = filter.polygon;

      // {
      //   location:{
      //  $geoWithin : {
      //    $geometry : {
      //      type:"Polygon",
      //      coordinates:[
      //          [
      //              [41.16670123027752, -8.680572509765627],
      //              [41.1149259123417, -8.647613525390627],
      //              [41.139783165945204, -8.581695556640627],
      //              [41.16670123027752, -8.680572509765627]
      //          ]
      //      ]
      //     }
      //   }
      // }
      // }

      const aggregations = [
        {
          $lookup: {
            from: 'companies',
            localField: 'companyId',
            foreignField: '_id',
            as: 'company'
          }
        },
        { $unwind: { path: '$company' } }
      ];
      polygon &&
        aggregations.push({
          $match: {
            'company.location': {
              $geoWithin: {
                $geometry: {
                  type: 'Polygon',
                  coordinates: [polygon]
                }
              }
            }
          }
        });

      services = await ServiceModel.aggregate(aggregations);
    }

    if (!services.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .jsend.fail({ message: 'services not founded' });
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

module.exports = { postService, getServices };
