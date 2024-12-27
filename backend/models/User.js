const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    authProvider: {
      type: String,
      required: true,
      enum: ['email', 'google', 'github', 'facebook'],
      default: 'email',
    },
    firebaseUid: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;