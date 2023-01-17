const Project = require('../models/projectModel');
const asyncHandler = require('../utils/asyncHandler');

const createProject = asyncHandler(async (req, res) => {
  const project = await Project.createProjectByRole(req.user, req.body);
  if (!project) throw Error('Not authorized to create project');
  res.status(201).json(project);
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json(projects);
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('team');
  if (!project) throw Error('Not such project');

  res.status(200).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.updateProjectByRole(
    req.user,
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!project) throw Error('Not authorized to update project');

  res.status(200).json(project);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw Error('Not such project');
  res.status(200).json({ message: `${project._id} Deleted Successfully` });
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
