const express = require('express');

const authHandler = require('../middleware/authMiddleware');

const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {
  loginUser,
  signupUser,
  logoutUser,
  restrictUser,
} = require('../controllers/authController');

// authentication routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

// authorization middleware
router.use(authHandler);
router.use(restrictUser('admin', 'manager'));

// users crud routes
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
