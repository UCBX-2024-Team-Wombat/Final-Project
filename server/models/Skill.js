const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillSchema = new Schema({});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
