const User = require("./User.js");
const Rating = require("./Rating.js");
const Skill = require("./Skill.js");
const SkillRelationship = require('./Skill_Relationship.js')
const Message = require('./Message.js') 
const Conversation = require('./Conversation.js')

// Create model relationships

module.exports = { User, Rating, Skill, SkillRelationship, Message, Conversation };