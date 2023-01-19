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
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'client', 'developer'],
      default: 'developer',
    },
  },
  {
    timestamps: true,
  }
);

// sign up static method
userSchema.statics.signup = async function (name, email, password, role) {
  const exists = await this.findOne({ email });

  // validation
  if (exists) throw new ErrorHandler('Email is already exists', 400);
  if (!name || !email || !password)
    throw new ErrorHandler('All fields must be filled', 400);
  if (!validator.isEmail(email))
    throw new ErrorHandler('Email must be a valid email', 400);
  if (!validator.isStrongPassword(password))
    throw new ErrorHandler(
      'Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol or ambiguous character',
      400
    );

  // bcrypt password hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash, role });

  return user;
};

// log in static method
userSchema.statics.login = async function (email, password) {
  // get user details
  const user = await this.findOne({ email }).select('+password');

  // validation
  if (!user) throw new ErrorHandler('Invalid Credentials', 400);
  if (!email || !password)
    throw new ErrorHandler('All fields must be filled', 400);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorHandler('Invalid Credentials', 400);

  return user;
};

module.exports = mongoose.model('User', userSchema);
