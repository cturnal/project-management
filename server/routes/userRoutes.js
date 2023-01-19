const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const {
  loginUser,
  signupUser,
  logoutUser,
  restrictUser,
} = require('../controllers/authController');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// authentication routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

// authorization middleware
router.use(authMiddleware);
router.use(restrictUser('admin'));

// users crud routes
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
