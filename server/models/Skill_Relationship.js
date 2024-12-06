const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skillRelationshipSchema = Schema({
    skill: {
        type: Schema.Types.ObjectId, 
        ref: 'Skill',
    },
    yearsOfExpereince: {
        type: Number,
        required: true,
    },
    areasOfExpertise: {
        type: String,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

const SkillRelationship = mongoose.model("Skill", skillRelationshipSchema);

module.exports = SkillRelationship;