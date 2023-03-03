const APIFeatures = require('../../../TOUR-APP/utils/apiFeatures');
const asyncHandler = require('./asyncHandler');
const ErrorHandler = require('./errorHandler');

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({ message: 'Create Successfully', document });
  });

const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.params.projectId) filter = { project: req.params.projectId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const documents = await features.query;
    res.status(200).json({ results: documents.length, documents });
  });

const getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    let referencing = Model.findById(req.params.id);
    if (populateOptions) referencing = referencing.populate(populateOptions);
    const document = await referencing;

    if (!document)
      return next(new ErrorHandler('No document found with that ID', 404));
    res.status(200).json(document);
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document)
      return next(new ErrorHandler('No document found with that ID', 404));

    res.status(200).json({ message: 'Update Successfully', document });
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document)
      return next(new ErrorHandler('No document found with that ID', 404));
    res.status(200).json({ message: 'Delete Successfully' });
  });

module.exports = { createOne, getAll, getOne, updateOne, deleteOne };
