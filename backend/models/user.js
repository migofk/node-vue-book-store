const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true},
  last_name: { type: String, required: true},
  email: { type: String, unique: true, required: true},
  role : { type: String, enum: {
    values: ['user', 'admin', 'super-admin'],
    message: '{VALUE} is not supported'
  }},
  password: { type: String, required: true},
  token: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);