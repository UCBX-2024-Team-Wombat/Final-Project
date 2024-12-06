const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const LocationSchema = require('./Location').schema;

const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  
  location: {
    type: LocationSchema,
    required: true,
  },

});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Apply password middleware to insertMany (for seeding purposes)
userSchema.pre("insertMany", async function (next, docs) {
  try {
    for (const doc of docs) {
      doc.password = await bcrypt.hash(doc.password, saltRounds);
    }
  } catch (err) {
    throw err;
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
