// *** handle uncaught exception, errors in synchronous code that are not handled anywhere
// ====================================================================================
// *** whenever there;s an 'Uncaught Exceptions' error occurs in a Nodejs application, process Object will
// ***** emit an event called 'uncaughtException' automatically. Therefore, to deal with this error, we just
// ***** need to add an event listener to process listening to the 'uncaughtException' event
// ====================================================================================
// *** put this on top of a the main script before all operations happen in order to catch all uncaught exceptions
// ***** and since the server doesn't start on the top of a script :)). Therefore,  we could simply shut down the
// ***** server right away  using process.exit()
process.on('uncaughtException', err => {
  console.log('========== UNCAUGHT EXCEPTION !!! shutting down ==========');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  // *** connect to local db
  // .connect(process.env.DATABASE_LOCAL, {
  // *** connect to db hosted in atlas
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(con => console.log('DB connection successful !'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`server is up & running on port: ${port}`);
});

// *** handle 'Unhandled Rejections', errors that don't come from expressjs
// ====================================================================================
// *** whenever there;s a 'Unhandled Rejections' error occurs in a Nodejs application, process Object will
// ***** emit an event called 'unhandledRejection' automatically
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('========== UNHANDLED REJECTION !!! shutting down ==========');

  // *** manually shutdown the server which gives it time to finish pending & running request
  server.close(() => {
    process.exit(1);
  });
});
