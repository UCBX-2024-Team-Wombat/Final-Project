const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const stateSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
  });
  
  const citySchema = new Schema({
    name: { 
        type: String, 
        required: true },
    county: { 
        type: String, 
        required: true 
    },
    states: [stateSchema],
  });
  
  const countrySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    cities: [citySchema],
  });
  
  const locationSchema = new Schema({
    country: countrySchema,
  });

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
