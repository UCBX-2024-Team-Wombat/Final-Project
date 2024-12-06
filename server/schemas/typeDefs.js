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
    addUser(username: String!, email: String!, password: String!, location: Location!): Auth
    login(email: String!, password: String!): Auth
  }
  type Province {
    name: String!
  }
  type Country {
    name: 
    city: String!
    province: Province
    state: Province
  }
`;

module.exports = typeDefs;
