const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ServiceTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'serviceTypes',
    timestamps: true
  }
);

ServiceTypeSchema.plugin(uniqueValidator);

module.exports = model('ServiceType', ServiceTypeSchema);
