const express = require('express');

const router = express.Router();

const {
  loginUser,
  signupUser,
  logoutUser,
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
