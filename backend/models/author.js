const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator');

const authorSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true},
  slug: { type: String, unique: true, required: true},
  image: { type: String, required: true},
  description: { type: String, required: true},
  books:[ { type: Schema.Types.ObjectId, ref: 'book'}],
}, { timestamps: true });

authorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", authorSchema);