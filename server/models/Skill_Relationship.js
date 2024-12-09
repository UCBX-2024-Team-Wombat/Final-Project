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
    areasOfExpertise: {
        type: String,
    },
    offered: Boolean,
    offeredText: String,
    seeking: Boolean,
    seekingText: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

const SkillRelationship = mongoose.model("SkillRelationship", skillRelationshipSchema);

module.exports = SkillRelationship;