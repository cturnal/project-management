const Project = require('../models/projectModel');
const asyncHandler = require('../utils/asyncHandler');
const controllerHandler = require('../utils/controllerHandler');
const ErrorHandler = require('../utils/errorHandler');

const limitFieldsByRole = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  const { role, id: user } = req.user;
  const { name, description, team, startDate, endDate } = req.body;

  if (!project && role === 'client') {
    req.body = {
      name,
      description,
      client: user,
    };
  } else if (user === project?.client._id.toLocaleString()) {
    req.body = {
      name,
      description,
    };
  } else if (user === project?.manager._id.toLocaleString()) {
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

const createProject = controllerHandler.createOne(Project);
const getProjects = controllerHandler.getAll(Project);
const getProject = controllerHandler.getOne(Project, {
  path: 'client manager team',
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
};
