const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CitySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    stateOrProvince: {
      type: String,
      required: true,
    },
  });
  
  const CountrySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    cities: [CitySchema], // Array of nested City documents
  });
  
  const Country = mongoose.model('Country', CountrySchema);
  
  module.exports = Country;