const typeDefs = `
  # Location Types
  type County {
    name: String!
  }

  type City {
    name: String!
    counties: [County!]!
  }

  type State {
    name: String!
    cities: [City!]!
  }

  type Country {
    name: String!
    states: [State!]!
  }
    #User
  type User {
    _id: ID
    username: String
    email: String
    password: String
    city: City
    county: County
    state: State
    country: Country
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
    getCountries: [Country!]!
    getProvinces(countryName: String!): [State!]!
    getCities(stateName: String!): [City!]!
    getCounties(cityName: String!): [County!]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
 
`;

module.exports = typeDefs;
