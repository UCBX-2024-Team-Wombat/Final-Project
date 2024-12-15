const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillSchema = new Schema({
  //help from module 21, activity 5
  name: {
    type: String,
    required: true,
    text: true,
  },
  description: {
    type: String,
    required: false,
  },
});

skillSchema.index({ name: "text" });

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
