const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Subdocument schema for province/state
const ProvinceSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  
const LocationSchema = new Schema({
    city: {
        type: String,
        required: true,
      },
      province: {
        type: ProvinceSchema,
        required: true,
      },
      state: {
        type: ProvinceSchema,
        required: true,
      },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = LocationSchema;
