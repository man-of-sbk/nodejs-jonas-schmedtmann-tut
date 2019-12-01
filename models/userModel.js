const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    trim: true
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
    // *** onlu work for create a new document, not update one
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: 'Passwords are not the same !'
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // *** hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // *** prevenet passwordConfirm field from being saved to db
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
