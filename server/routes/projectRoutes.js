const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const taskRoutes = require('./taskRoutes');

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  cancelProject,
  limitFieldsByRole,
} = require('../controllers/projectController');
const { restrictUser } = require('../controllers/authController');

router.use(authMiddleware);

router.use('/:projectId/tasks', taskRoutes);

router.delete('/:id/cancel', restrictUser('client'), cancelProject);

router
  .route('/')
  .get(getProjects)
  .post(restrictUser('admin', 'client'), limitFieldsByRole, createProject);
router
  .route('/:id')
  .get(getProject)
  .patch(
    restrictUser('admin', 'manager', 'client'),
    limitFieldsByRole,
    updateProject
  )
  .delete(restrictUser('admin'), deleteProject);

module.exports = router;
