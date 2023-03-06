const Project = require('../models/projectModel');

const asyncHandler = require('../utils/asyncHandler');
const controllerHandler = require('../utils/controllerHandler');
const ErrorHandler = require('../utils/errorHandler');

// limit the create and update of project depends on roles
const limitFieldsByRole = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  const { role, id: user } = req.user;
  const { name, description, team, startDate, endDate, manager } = req.body;

  if (!project && role === 'client') {
    req.body = {
      name,
      description,
      client: user,
    };
  } else if (
    user === project?.client?._id.toString() &&
    project.status === 'pending'
  ) {
    req.body = {
      name,
      description,
      manager,
    };
  } else if (user === project?.manager?._id.toString()) {
    req.body = {
      status: 'in-progress',
      team,
      startDate,
      endDate,
    };
  } else if (role === 'admin') {
  } else {
    return next(new ErrorHandler('Not authorized', 403));
  }
  return next();
});

// client canceling the project
const cancelProject = asyncHandler(async (req, res, next) => {
  const proj = await Project.findById(req.params.id);
  const user = req.user.id;
  if (!proj) return next(ErrorHandler('Not such project', 404));

  if (user !== proj.client._id.toLocaleString())
    return next(new ErrorHandler('Not authorized', 403));
  if (proj.status === 'completed' || proj.status === 'failed')
    return next(new ErrorHandler('Not authorized', 403));

  await Project.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(204).json({
    message: 'project cancelled successfully',
    document: null,
  });
});

const topProjects = (req, res, next) => {
  req.query.limit = '5';
  req.query.status = 'completed';
  req.query.sort = '-ratingsAverage';
  next();
};

// CRUD features for project
const createProject = controllerHandler.createOne(Project);
const getProjects = controllerHandler.getAll(Project);
const getProject = controllerHandler.getOne(Project, {
  path: 'client manager team tasks',
});
const updateProject = controllerHandler.updateOne(Project);
const deleteProject = controllerHandler.deleteOne(Project);

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  cancelProject,
  limitFieldsByRole,
  topProjects,
};
