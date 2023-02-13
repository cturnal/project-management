const User = require('../models/userModel');

const controllerHandler = require('../utils/controllerHandler');
const ErrorHandler = require('../utils/errorHandler');
const multer = require('multer');

//  upload single image feature
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorHandler('Not an image! Please upload only image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('photo');

// get single profile using my-profile endpoint
const getMyProfile = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// update user profile
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  req.params.id = req.user.id;
  if (req.user.role !== 'admin') {
    req.body = {
      name,
      email,
    };
  }
  if (req.file) req.body.photo = req.file.filename;

  next();
};

// user CRUD features
const createUser = controllerHandler.createOne(User);
const getUsers = controllerHandler.getAll(User);
const getUser = controllerHandler.getOne(User, {
  path: 'reviews',
});
const updateUser = controllerHandler.updateOne(User);
const deleteUser = controllerHandler.deleteOne(User);

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateProfile,
  uploadUserPhoto,
};
