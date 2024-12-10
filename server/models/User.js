const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

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
  gender: {
    type: String,
  },
  description: {
    type: String,
  },
  meetingPreference: {
    type: String,
  },
  city: String,
  county: String,
  stateOrProvince: String,
  country: String,
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  // Because of special circumstances for mongoose update middleware (see https://mongoosejs.com/docs/middleware.html#notes)
  // 'this' cannot refer to the document being modified. Instead it refers to the query.
  // While you can query the document within this hook, that document doesn't return a value for the isModified method.
  // To get around this, we just check to see if "password" is part of the update payload. If it is, we hash it.
  // This way, we don't have to rely on the isModified method (since we know this document's password is being updated)
  // and we know that the password being set is a hashed version of the string the user entered.

  if (this._update.password) {
    // Check if update payload includes the password property
    this._update.password = await bcrypt.hash(
      this._update.password,
      saltRounds
    ); // Update that property to a hashed version
  }
  next(); // Continue with transaction
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
