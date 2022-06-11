const { Schema, model, ObjectId } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { getSignedUrl } = require('../utils/s3');

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    companyId: { type: ObjectId },
    typeId: { type: ObjectId },

    photos: {
      type: Array,
      default: [],
      get: (photos) => photos.map((photo) => getSignedUrl(photo))
    },
    price: Number,
    duration: Number,
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'services',
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
  }
);

ServiceSchema.plugin(uniqueValidator);

module.exports = model('Service', ServiceSchema);
