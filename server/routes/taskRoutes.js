const express = require('express');

const router = express.Router({ mergeParams: true });

const authMiddleware = require('../middleware/authMiddleware');
const { restrictUser } = require('../controllers/authController');

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  limitFieldsByRole,
  setTasksProjectIds,
} = require('../controllers/taskController');

router.use(authMiddleware);

router
  .route('/')
  .get(getTasks)
  .post(restrictUser('admin', 'manager'), setTasksProjectIds, createTask);
router
  .route('/:id')
  .get(getTask)
  .patch(
    restrictUser('admin', 'manager', 'developer'),
    limitFieldsByRole,
    updateTask
  )
  .delete(restrictUser('admin', 'manager'), deleteTask);

module.exports = router;
