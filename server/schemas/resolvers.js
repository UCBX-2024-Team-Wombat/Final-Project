const { User } = require("../models/index.js");
const { signToken, AuthenticationError } = require("../utils/auth.js");
const Country = require('../models/Country');
const State = require('../models/State');
const City = require('../models/City');

const resolvers = {
  Query: {
    getCountries: async () => await Country.find().populate('states'),
    getProvinces: async (_, { countryName }) => {
      const country = await Country.findOne({ name: countryName }).populate('states');
      return country ? country.states : [];
    },
    getCities: async (_, { stateName }) => {
      const state = await State.findOne({ name: stateName }).populate('cities');
      return state ? state.cities : [];
    },
    getCounties: async (_, { cityName }) => {
      const city = await City.findOne({ name: cityName });
      return city ? city.counties : [];
    },
    user: async (parent, args, context) => {
      const user = await User.findOne({ username: context.args.username }).populate(['city', 'county', 'state', 'country']); // users has location data 
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
    addUser: async (parent, { username, email, password, }) => {
      const user = await User.create({ username, email, password});
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
