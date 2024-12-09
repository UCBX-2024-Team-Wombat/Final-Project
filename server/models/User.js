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
    type: String
  },
  description: {
    type: String
  },
  meetingPreference: {
    type: String
  },
  // location: {type: Schema.Types.ObjectId, ref: 'Location'},
  availableSkills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
  desiredSkills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
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
