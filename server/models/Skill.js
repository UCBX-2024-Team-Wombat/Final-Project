const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillSchema = new Schema(
    {
        //help from module 21, activity 5 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
