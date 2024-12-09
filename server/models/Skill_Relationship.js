const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillRelationshipSchema = Schema({
    skill: {
        type: Schema.Types.ObjectId, 
        ref: 'Skill',
    },
    yearsOfExperience: {
        type: String,
    },
    offered: Boolean,
    offeredText: String,
    desired: Boolean,
    desiredText: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

const SkillRelationship = mongoose.model("SkillRelationship", skillRelationshipSchema);

module.exports = SkillRelationship;