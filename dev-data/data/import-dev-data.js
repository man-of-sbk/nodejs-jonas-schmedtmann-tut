const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModels');

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

// *** read data file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// *** delete old data which doesn't match the data format we want
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted !');
  } catch (err) {
    console.log(err);
  }
};

// *** import new data to db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded !');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
