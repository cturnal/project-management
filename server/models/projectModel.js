const mongoose = require('mongoose');
const User = require('./userModel');

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
    status: {
      type: String,
      enum: [
        'pending',
        'in-que',
        'in-progress',
        'completed',
        'cancelled',
        'declined',
        'failed',
      ],
      default: 'pending',
    },
    clientID: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      enum: [],
    },
    managerID: {
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

    startDate: {
      type: Date,
      validate: {
        validator: function (s) {
          return s.toLocaleString() >= new Date().toLocaleString();
        },
        message: 'Start date must be before end date',
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (e) {
          return e > this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.path('managerID').validate(function (id) {
  return User.findById(id).then((user) => {
    if (user.role === 'manager') return;
    throw Error('Selected user is not a manager');
  });
});

projectSchema.path('clientID').validate(function (id) {
  return User.findById(id).then((user) => {
    if (user.role === 'client') return;
    throw Error('Selected user is not a client');
  });
});

projectSchema.statics.createProjectByRole = async function (user, body) {
  const { name, description, clientID, managerID, startDate, endDate } = body;
  if (user.role === 'admin') {
    const project = await this.create({
      name,
      description,
      status: 'in-que',
      clientID,
      managerID,
      startDate,
      endDate,
    });
    return project;
  }

  if (user.role === 'client') {
    const project = await this.create({
      name,
      description,
      clientID: user.id,
    });
    return project;
  }
  return;
};

projectSchema.statics.updateProjectByRole = async function (
  user,
  projectId,
  body
) {
  const { name, description, startDate, endDate, status, team } = body;

  if (user.role === 'admin') {
    const project = await this.findByIdAndUpdate(projectId, body, {
      new: true,
    });
    return project;
  }

  const isClient = await this.findOne({
    _id: projectId,
    clientID: user.id,
  });
  if (isClient && user.role === 'client' && isClient.status === 'pending') {
    const project = await this.findByIdAndUpdate(
      projectId,
      {
        name,
        description,
      },
      { new: true }
    );
    return project;
  }
  const isManager = await this.findOne({
    _id: projectId,
    managerID: user.id,
  });
  if (
    isManager &&
    user.role === 'manager' &&
    (isManager.status === 'in-que' || 'in-progress')
  ) {
    const project = await this.findByIdAndUpdate(
      projectId,
      {
        status: 'in-progress',
        team,
        startDate,
        endDate,
      },
      {
        new: true,
      }
    );
    return project;
  }
  return;
};

module.exports = mongoose.model('Project', projectSchema);
