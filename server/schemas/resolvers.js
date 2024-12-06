const { User } = require("../models/index.js");
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
  },
  Mutation: {
    addUser: async (parent, { username, email, password, location }) => {
      const user = await User.create({ username, email, password, location });
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
  },
};

module.exports = resolvers;
