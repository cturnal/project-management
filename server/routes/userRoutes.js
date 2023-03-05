const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const reviewRoutes = require('./reviewRoutes');

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
  uploadUserPhoto,
  topAgents,
} = require('../controllers/userController');

// authentication routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

// user should be authenticated
router.use(authMiddleware);

router.use('/:employeeId/reviews', reviewRoutes);
router.route('/top-5-managers').get(topAgents('manager'), getUsers);
router.route('/top-5-developers').get(topAgents('developer'), getUsers);
router.route('/top-5-clients').get(topAgents('client'), getUsers);

router.get('/my-profile', getMyProfile, getUser);
router.patch('/update-profile', uploadUserPhoto, updateProfile, updateUser);
router.patch('/update-password', updatePassword);

// users crud routes
router.route('/').get(getUsers);
router.use(restrictUser('admin'));

router.route('/').post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
