const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true,maxlength:600},
  slug: { type: String, unique: true, required: true,maxlength:650},
 
  metaRobots : { type: String, enum: {
    values: ['all', 'noindex', 'nofollow','noindex, nofollow'],
    message: '{VALUE} is not supported'
  }},
  metaDescription : { type: String, maxlength:600},
  icon : { type: String, maxlength:1000},
  image : { type: String, maxlength:1000},
  thumbnail : { type: String, maxlength:1000},
  description : { type: String,  maxlength:60650},
  parent: { type: Schema.Types.ObjectId, ref: 'Book'},
  status : { type: String, enum: {
    values: ['active', 'deactivated','draft','waiting review'],
    message: '{VALUE} is not supported'
  }},
  book:[ { type: Schema.Types.ObjectId, ref: 'Book'}],
}, { timestamps: true });

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);