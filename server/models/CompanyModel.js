const { Schema, model, ObjectId } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { getSignedUrl } = require('../utils/s3');
const { GLOBALS } = require('@get_appointment/shared');

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    adminId: { type: ObjectId, required: true },
    avatar: {
      type: String,
      get: (avatarId) => avatarId && getSignedUrl(avatarId)
    },
    background: {
      type: String,
      get: (backgroundId) => backgroundId && getSignedUrl(backgroundId)
    },
    nif: {
      type: String,
      required: true,
      unique: true
    },
    phone: String,
    // [longitude (0-180), latitude (0-90)]
    location: {
      type: { type: String },
      coordinates: [Number]
    },
    photos: {
      type: Array,
      default: [],
      get: (photos) => photos.map((photo) => getSignedUrl(photo))
    },
    status: {
      type: Number,
      validate: {
        validator: (value) =>
          Object.values(GLOBALS.COMPANY.STATUS).includes(value),
        message: '{VALUE} is not a valid type'
      },
      default: GLOBALS.COMPANY.STATUS.PENDING
    }
  },
  {
    collection: 'companies',
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
  }
);
CompanySchema.index({ location: '2dsphere' });

CompanySchema.plugin(uniqueValidator);

module.exports = model('Company', CompanySchema);
