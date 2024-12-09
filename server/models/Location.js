const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const locationSchema = new Schema({
    city: {
        name: { 
            type: String,
            required: true 
        },
        county: { 
            type: String  // Subdocument for City
        },
      },
      state: {
        name: {
            type: String 
        },
        abbreviation: {
             type: String //  for additional field
             }, 
      },
      country: {
        name: { 
            type: String, 
            required: true
        },
        code: {
             type: String //Like: 'US'
            }, 
      },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
