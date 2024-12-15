const typeDefs = `

  input UserInput {
    username: String
    email: String
    password: String
    gender: String
    bio: String
    meetingPreference: String
    city: String
    county: String
    stateOrProvince: String
    country: String
  }

  input UserFilterInput {
    gender: String
    meetingPreference: String
    city: String
    stateOrProvince: String
    country: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    gender: String
    bio: String
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
    _id: ID!
    sender: User!
    receiver: User!
    message: String!
    timestamp: String!
  }

  input SkillRelationshipInput {
    skillRelationshipId: ID
    skillId: ID!
    userId: ID!
    yearsOfExperience: String
    offered: Boolean
    offeredText: String
    desired: Boolean
    desiredText: String
  }

  type SkillRelationship {
    _id: ID
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
    skillsByName(searchString: String!): [Skill]
    skill(id: ID!): Skill
    getSkillRelationshipsByUserId(userId: ID!): [SkillRelationship]
    getSkillRelationshipsBySearchCriteria(skillIds: [ID]!, userFilterInput: UserFilterInput): [SkillRelationship]
    getMessagesBetweenUsers(userIds: [ID]!): [ChatMessage]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    modifyUser(userId: ID!, userInput: UserInput!): User
    addSkill(name: String!, description: String): Skill
    modifySkill(id: ID!, name: String, description: String): Skill
    deleteSkill(id: ID!): Skill
    addSkillRelationship(input: SkillRelationshipInput): SkillRelationship
    modifySkillRelationship(skillRelationshipId: ID!, skillRelationshipInput: SkillRelationshipInput!): SkillRelationship
    sendMessage(receiverId: ID!, message: String!): ChatMessage    
    #allow one user to send a message to another user in a one-to-one chat system.
  }
`;

module.exports = typeDefs;
