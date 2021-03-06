const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const { getSignedUrl } = require('../utils/s3');
const { GLOBALS } = require('@get_appointment/shared');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    active: {
      type: Boolean,
      default: true
    },
    role: {
      type: Number,
      validate: {
        validator: (value) => Object.values(GLOBALS.USER.ROLES).includes(value),
        message: '{VALUE} is not a valid type'
      },
      default: GLOBALS.USER.ROLES.NORMAL
    },
    avatar: {
      type: String,
      get: (avatarId) => avatarId && getSignedUrl(avatarId)
    }
  },
  {
    collection: 'users',
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true }
  }
);

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.plugin(uniqueValidator);

module.exports = model('User', UserSchema);
