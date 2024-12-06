const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillSchema = new Schema(
    {
    name: {
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true
    }
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
