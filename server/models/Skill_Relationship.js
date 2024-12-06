const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillRelationshipSchema = Schema({
    skill: {
        type: Schema.Types.ObjectId, 
        ref: 'Skill',
    },
    SkillInQuestion: {
        type: String,
        required: true,
    },
    YearsOfExpereince: {
        type: Number,
        required: true,
    },
    AreasOfExpertise: {
        type: String,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

const SkillRelationship = mongoose.model("Skill", skillRelationshipSchema);

module.exports = SkillRelationship;