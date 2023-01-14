// dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const errorHandler = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

// express app
const app = express();

// middleware
// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/users', userRoutes);

app.all('*', (req, res, next) => {
  res.status(404);
  throw new Error('Route not found');
});

app.use(errorHandler);

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