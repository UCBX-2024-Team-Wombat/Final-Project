const typeDefs = `
type State {
    name: String!
  }

  type City {
    name: String!
    county: String!
    states: [State]
  }

  type Country {
    name: String!
    cities: [City]
  }

  type Location {
    country: Country!
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gender: String
    description: String
    meetingPreference: String
    location: Location
    availableSkills: [Skill]
    desiredSkills: [Skill]
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
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
