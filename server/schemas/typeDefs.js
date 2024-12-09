const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gender: String
    description: String
    meetingPreference: String
    #location: Location
    availableSkills: [Skill]
    desiredSkills: [Skill]
    city: String
    county: String
    stateOrProvince: String
    country: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Skill {
    _id: ID
    name: String
    description: String
  }

  type Query {
    allUsers: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
