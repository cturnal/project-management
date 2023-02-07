const mongoose = require('mongoose');
const User = require('./userModel');
const ErrorHandler = require('../utils/errorHandler');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'in-que',
        'in-progress',
        'completed',
        'cancelled',
        'failed',
      ],
      default: 'pending',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      enum: [],
    },
    manager: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      enum: [],
    },
    team: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual('tasks', {
  ref: 'Task',
  foreignField: 'project',
  localField: '_id',
});

projectSchema.path('startDate').validate(async function (date) {
  if (date.toLocaleString() >= new Date().toLocaleString()) return;
  throw new ErrorHandler('Start date must be before end date', 400);
});

projectSchema.path('endDate').validate(async function (date) {
  if (date > this.startDate) return;
  throw new ErrorHandler('End date must be after start date', 400);
});

projectSchema.path('client').validate(async function (id) {
  return await User.findById(id).then((user) => {
    if (user.role === 'client') return;
    throw new ErrorHandler('Selected user is not a client', 400);
  });
});

projectSchema.path('manager').validate(async function (id) {
  return await User.findById(id).then((user) => {
    if (user.role === 'manager') return;
    throw new ErrorHandler('Selected user is not a manager', 400);
  });
});

projectSchema.path('team').validate(async function (team) {
  const developers = await User.find({ _id: { $in: team }, role: 'developer' });
  if (team.length === developers.length) return;
  throw new ErrorHandler('Selected user is not a developer', 400);
});

projectSchema.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client manager team',
    select:
      '-__v -createdAt -updatedAt -ratingsAverage -ratingsQuantity -price',
  });

  next();
});

module.exports = mongoose.model('Project', projectSchema);
