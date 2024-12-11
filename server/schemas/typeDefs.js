const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gender: String
    description: String
    meetingPreference: String
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
  type ChatMessage {
  id: ID!
  sender: User!
  receiver: User!
  message: String!
  timestamp: String!
}


  input SkillRelationshipInput {
    skillId: ID!
    userId: ID!
    yearsOfExperience: String
    offered: Boolean
    offeredText: String
    desired: Boolean
    desiredText: String
  }

  type SkillRelationship {
    skill: Skill
    yearsOfExperience: String
    offered: Boolean
    offeredText: String
    desired: Boolean
    desiredText: String
    user: User
  }

  type Query {
    allUsers: [User]
    user(userId: ID!): User
    me: User
    skills: [Skill]
    skill(id: ID!): Skill
    getSkillRelationships(userId: ID!, offered: Boolean, desired: Boolean): [SkillRelationship]
    getMessagesBetweenUsers(senderId: ID!, receiverId: ID!): [ChatMessage]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSkill(name: String!, description: String): Skill
    modifySkill(id: ID!, name: String, description: String): Skill
    deleteSkill(id: ID!): Skill
    addSkillRelationship(input: SkillRelationshipInput): SkillRelationship
    sendMessage(receiverId: ID!, message: String!): ChatMessage    #allow one user to send a message to another user in a one-to-one chat system.
  }
`;

module.exports = typeDefs;
