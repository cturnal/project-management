const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'for-approval', 'done'],
      default: 'in-progress',
    },
    developer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      enum: [],
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
      required: true,
    },
    message: String,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

taskSchema.path('developer').validate(async function (id) {
  return await this.model('Project')
    .findOne({ team: { $in: [id] } })
    .then((user) => {
      if (user) return;
      throw new ErrorHandler(
        'Selected user is not in a team developer for the project',
        400
      );
    });
});

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'developer',
    select: '-__v -createdAt -updatedAt -reviews -ratingsAverage -price',
  });

  next();
});

module.exports = mongoose.model('Task', taskSchema);
