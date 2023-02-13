// dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/errorMiddleware');
const ErrorHandler = require('./utils/errorHandler');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION!, Shutting down');
  console.log(error.name, error.message);
  process.exit(1);
});

// express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reviews', reviewRoutes);

app.all('*', (req, res, next) => {
  res.status(404);
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

// server and database

const server = app.listen(PORT, () =>
  console.log(`Server start listening on port ${PORT}`)
);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`Database Connected`);
});

process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION!, Shutting down');
  console.log(error.name, error.message);
  server.close(() => process.exit(1));
});
