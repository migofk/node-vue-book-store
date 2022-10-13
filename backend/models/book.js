const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true},
  slug: { type: String, unique: true, required: true},
  image: { type: String, required: true},
  description: { type: String, required: true},
  author:{ type: Schema.Types.ObjectId, ref: 'Author'},
  categories:[ { type: Schema.Types.ObjectId, ref: 'Category'}],
}, { timestamps: true });

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", bookSchema);