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

// express app
const app = express();

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

// database and server
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `Database Connected and Server start listening on port ${process.env.PORT}`
      )
    );
  })
  .catch((error) => console.log(error));
