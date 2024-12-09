const { User, Skill, SkillRelationship } = require("../models/index.js");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = await User.findOne({ username: context.args.username });
      return user;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    skills: async (parent, args, context) => {
      //this will grab all the skills from the database
      return await Skill.find();
    },
    skill: async (parent, {id}) => {
      //this will grab a skill by it's id
      return await Skill.findById(id);
    },
    getSkillRelationships: async (parent, { userId }) => {
      //populate taken from module 21, activity 5 /schemas/resolvers.js
      const skillRelationships = await SkillRelationship.find({ user: userId }).populate('skill').populate('user');
      //this will return an array of the skillRelationships objects 
      return skillRelationships;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    //help from module 21, activity 17
    addSkill: async (parent, { name, description}) => {
      //creates a skill with the name and description
      const skill = await Skill.create({ name, description});
      return skill;
    },
    modifySkill: async (parent, { id, name, description}) => {
      //finds a skill by id and updates the name and description 
      const skill = await Skill.findByIdAndUpdate( id, { name, description }, {returnDocument: 'after'});
      return skill;
    },
    deleteSkill: async (parent, { id }) => {
      //finds a skill by id and deletes it
      const skill = await Skill.findByIdAndDelete(id);
      return skill;
    },
    addSkillRelationship: async (parent, { skillId, yearsOfExperience, areasOfExpertise, userId }) => {
      //creates a skill relationship and adds the skill, years of experience and areas of experience
      const skillRelationship = await SkillRelationship.create({ skill: skillId, yearsOfExperience, areasOfExpertise, user: userId });
      return skillRelationship;
    },
  },
};

module.exports = resolvers;
