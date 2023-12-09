require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
const { ObjectId } = require('mongodb');

const userSchema = new Schema ({
  username: {
    type: String,
    required: true
  }
});

const exerciseSchema = new Schema ({
  user: {
    type: ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  unix: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('user', userSchema);
const Exercise = mongoose.model('exercise', exerciseSchema);

module.exports = { User, Exercise };