const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
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
  if (exists) {
    throw Error('Email is already exists');
  }
  if (!name || !email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email must be a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      'Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol or ambiguous character'
    );
  }

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
  if (!user) {
    throw Error('Invalid Credentials');
  }
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Invalid Credentials');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
