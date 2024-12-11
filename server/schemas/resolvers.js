const { User, Skill, SkillRelationship } = require("../models/index.js");
const { signToken, AuthenticationError } = require("../utils/auth.js");
const ChatMessage = require('../models/ChatMessage');
const { populate } = require("../models/User.js");

const resolvers = {
 
  Query: {
    getMessagesBetweenUsers: async(_,{senderId,receiverId}) => {
      return ChatMessage.find({
        $or: [
          {sender:senderId, receiver: receiverId} //condition captures all messages exchanged between the two users, irrespective of the sender's or receiver's role in each message.
        ]
      }).populate('sender'),populate('receiver')
    },
    allUsers: async (parent) => {
      return await User.find();
    },
    user: async (parent, { userId }) => {
      const user = await User.findById(userId);  //Add populate for location later
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
    getSkillRelationships: async (parent, { userId, offered, desired }) => {
      //populate taken from module 21, activity 5 /schemas/resolvers.js
      const searchFilter = { user: userId};

      if(offered) searchFilter.offered = offered;
      if(desired) searchFilter.desired = desired;

      const skillRelationships = await SkillRelationship.find(searchFilter).populate('skill').populate('user');
      //this will return an array of the skillRelationships objects 
      return skillRelationships;
    }
  },
  Mutation: {
    sendMessage: async (_, { receiverId, message }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const chatMessage = await ChatMessage.create({
        sender: user._id,
        receiver: receiverId,
        message,
        timestamp: new Date(),
      });
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
    addSkillRelationship: async (parent, { input }) => {
      //creates a skill relationship and adds the skill, years of experience and areas of experience
      const skillRelationshipObject = {
        skill: input.skillId,
        user: input.userId,
        yearsOfExperience: input.yearsOfExperience,
        offered: input.offered,
        offeredText: input.offeredText,
        desired: input.desired,
        desiredText: input.desiredText
      };
      const skillRelationship = await SkillRelationship.create(skillRelationshipObject);
      return skillRelationship;
    },
  },
};

module.exports = resolvers;