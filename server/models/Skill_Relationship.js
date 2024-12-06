const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillRelationshipSchema = Schema({
    skill: {
        type: Schema.Types.ObjectId, 
        ref: 'Skill',
    },
    yearsOfExperience: {
        type: String,
        required: true,
    },
    areasOfExpertise: {
        type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

const SkillRelationship = mongoose.model("SkillRelationship", skillRelationshipSchema);

module.exports = SkillRelationship;