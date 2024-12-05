const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const locationSchema = new Schema({});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
