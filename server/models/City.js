const mongoose = require('mongoose');
const { Schema } = mongoose;

const countySchema = new Schema({
  name: { type: String, required: true, trim: true },
});

const citySchema = new Schema({
  name: { type: String, required: true, trim: true },
  counties: [countySchema],
});

module.exports = citySchema;
