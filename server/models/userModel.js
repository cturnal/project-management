const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/errorHandler');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      validate: [
        validator.isStrongPassword,
        'Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol or ambiguous character',
      ],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm the password'],
      select: false,
      validate: {
        validator: function (confirm) {
          return confirm === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    photo: {
      type: String,
      default: 'default.png',
    },
    role: {
      type: String,
      enum: ['client', 'developer', 'manager'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model('User', userSchema);
