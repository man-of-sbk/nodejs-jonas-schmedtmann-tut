const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// *** handle undefined routes. Since middlewares run in sequence. one after another => if the following middleware is executed,
// ***** it means that the the route an user enter doesn't match any routes above => this is absolutely an undefined route
// ==============================================================================================================
// *** .all() method accept all HTTP methods
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// *** by just simply passing a function having 4 arguments, expressjs automatically consider it as an error middleware
// =====================================================================================================================
// *** Whenever a next() function of a middleware is called with an arg => expressjs will SKIP all other middlewares &
// ***** send the error, the arg of the next() function to error middlewares and execute the error middlewares
app.use(globalErrorHandler);

module.exports = app;
