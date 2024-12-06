const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Subdocument schema for province/state
const ProvinceSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  
const locationSchema = new Schema({
    city: {
        type: String,
        required: true,
        trim: true,
      },
      province: {
        type: String,
        required: false,
        trim: true,
      },
      state: {
        type: String,
        required: false,
        trim: true,
      },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
