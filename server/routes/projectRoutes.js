const express = require('express');

const router = express.Router();

const authHandler = require('../middleware/authMiddleware');

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { restrictUser } = require('../controllers/authController');

router.use(authHandler);

router
  .route('/')
  .get(getProjects)
  .post(restrictUser('admin', 'client'), createProject);
router
  .route('/:id')
  .get(getProject)
  .patch(restrictUser('admin', 'manager', 'client'), updateProject)
  .delete(restrictUser('admin'), deleteProject);

module.exports = router;
