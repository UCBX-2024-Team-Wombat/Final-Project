const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    location: Location!
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

  type SkillRelationship {
  
  }

  type Query {
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, location: LocationInput!): Auth
    login(email: String!, password: String!): Auth
  }
  input LocationInput {
    city: String!
    province: String
    state: String
  }
`;

module.exports = typeDefs;
