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

  type SkillRelationship {
    skill: Skill
    yearsOfExperience: String
    areasOfExpertise: String
    user: User
  }

  type Query {
    allUsers: [User]
    user(userId: ID!): User
    me: User
    skills: [Skill]
    skill(id: ID!): Skill
    getSkillRelationships(userId: ID!): [SkillRelationship]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSkill(name: String!, description: String): Skill
    modifySkill(id: ID!, name: String, description: String): Skill
    deleteSkill(id: ID!): Skill
    addSkillRelationship(skillId: ID!, yearsOfExperience: String, areasOfExpertise: String, userId: ID!): SkillRelationship
  }
`;

module.exports = typeDefs;
