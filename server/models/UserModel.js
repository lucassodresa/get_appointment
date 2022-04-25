const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

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
        validator: (value) => [1, 2].includes(value),
        message: '{VALUE} is not a valid type'
      },
      default: 2
    },
    avatar: String
  },
  {
    collection: 'users',
    timestamps: true
  }
);

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.plugin(uniqueValidator);

module.exports = model('User', UserSchema);
