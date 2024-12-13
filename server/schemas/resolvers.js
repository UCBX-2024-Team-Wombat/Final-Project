const { User, Skill, SkillRelationship } = require("../models/index.js");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    allUsers: async (parent) => {
      return await User.find();
    },
    user: async (parent, { userId }) => {
      const user = await User.findById(userId); //Add populate for location later
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
    skillsByName: async (parent, { searchString }) => {
      console.log("searchString", searchString);

      return await Skill.find({
        $text: {
          $search: searchString,
          // $caseSensitive: false,
        },
      });
    },
    skill: async (parent, { id }) => {
      //this will grab a skill by it's id
      return await Skill.findById(id);
    },
    getSkillRelationshipsByUserId: async (parent, { userId }) => {
      //populate taken from module 21, activity 5 /schemas/resolvers.js
      const skillRelationships = await SkillRelationship.find({ user: userId })
        .populate("skill")
        .populate("user");
      //this will return an array of the skillRelationships objects
      return skillRelationships;
    },
    getSkillRelationshipsBySearchCriteria: async (
      parent,
      { skillIds, userFilterInput }
    ) => {
      // Search on SkillRelationships by skill Ids
      const skillRelationshipsBySkillIds = await SkillRelationship.find({
        skill: { $in: skillIds },
      })
        .populate("skill")
        .populate("user");

      // Create User filter object
      const userSearchFilters = [];

      for (const field of Object.keys(userFilterInput)) {
        // Use case insensitivity
        userSearchFilters.push({
          [field]: {
            $regex: `${userFilterInput[field]}`,
            $options: "i",
          },
        });
      }

      // Return originally queried skill relationships if no user filters found
      if (userSearchFilters.length == 0) {
        return skillRelationshipsBySkillIds;
      }

      // else construct formatted user filter
      let formattedUserFilter;

      if (userSearchFilters.length == 1) {
        formattedUserFilter = userSearchFilters[0];
      } else {
        formattedUserFilter = {
          $and: [],
        };

        for (const filter of userSearchFilters) {
          formattedUserFilter.$and.push(filter);
        }
      }

      // Query users with filter
      const qualifiedUsers = await User.find(formattedUserFilter);

      // extract User Ids
      const qualifiedUserIds = qualifiedUsers.map((user) =>
        user._id.toString()
      );

      // Check if any queried Skill relationships are assoc. with a
      // user that is within qualfied user group
      const qualifiedSkillRelationships = [];

      for (const skillRelationship of skillRelationshipsBySkillIds) {
        // If match found, add to return list
        if (qualifiedUserIds.includes(skillRelationship.user._id.toString())) {
          qualifiedSkillRelationships.push(skillRelationship);
        }
      }

      // Return filtered results
      return qualifiedSkillRelationships;
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

    modifyUser: async (parent, { userId, userInput }) => {
      await User.findOneAndUpdate({ _id: userId }, userInput, {
        returnDocument: "after",
      });
    },
    //help from module 21, activity 17
    addSkill: async (parent, { name, description }) => {
      //creates a skill with the name and description
      const skill = await Skill.create({ name, description });
      return skill;
    },
    modifySkill: async (parent, { id, name, description }) => {
      //finds a skill by id and updates the name and description
      const skill = await Skill.findByIdAndUpdate(
        id,
        { name, description },
        { returnDocument: "after" }
      );
      return skill;
    },
    modifySkillRelationship: async (
      parent,
      { skillRelationshipId, skillRelationshipInput }
    ) => {
      const skillRelationship = await SkillRelationship.findByIdAndUpdate(
        skillRelationshipId,
        { ...skillRelationshipInput },
        { returnDocument: "after" }
      );
      return skillRelationship;
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
        desiredText: input.desiredText,
      };
      const skillRelationship = await SkillRelationship.create(
        skillRelationshipObject
      );
      return skillRelationship;
    },
  },
};

module.exports = resolvers;
