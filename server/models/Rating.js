const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ratingSchema = new Schema({});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
