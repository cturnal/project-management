const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

const asyncHandler = require('../utils/asyncHandler');
const controllerHandler = require('../utils/controllerHandler');
const ErrorHandler = require('../utils/errorHandler');

// Allow nested routes
const setTasksProjectIds = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId);
  if (req.user.id !== project?.manager._id.toString())
    return next(new ErrorHandler('Not Authorized', 403));
  if (!req.body.project) req.body.project = req.params.projectId;
  next();
});

// Limit the fields of body depends on the role
const limitFieldsByRole = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  const { role } = req.user;
  const { message } = req.body;

  if (!task) return next(new ErrorHandler('theres no such task', 404));

  if (role === 'developer' && req.user.id === task.developer._id.toString()) {
    req.body = {
      status: 'for-approval',
      message,
    };
  } else if (role === 'admin' || role === 'manager') {
  } else {
    return next(new ErrorHandler('Not authorized', 403));
  }
  return next();
});

// task CRUD features
const createTask = controllerHandler.createOne(Task);
const getTasks = controllerHandler.getAll(Task);
const getTask = controllerHandler.getOne(Task, {
  path: 'developer',
});
const updateTask = controllerHandler.updateOne(Task);
const deleteTask = controllerHandler.deleteOne(Task);

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  limitFieldsByRole,
  setTasksProjectIds,
};
