const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const {
  loginUser,
  signupUser,
  logoutUser,
  restrictUser,
  updatePassword,
} = require('../controllers/authController');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateProfile,
} = require('../controllers/userController');

// authentication routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

// user should be authenticated
router.use(authMiddleware);
router.get('/my-profile', getMyProfile, getUser);
router.patch('/update-profile', updateProfile, updateUser);
router.patch('/update-password', updatePassword);

// router.use(restrictUser('admin'));

// users crud routes
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
