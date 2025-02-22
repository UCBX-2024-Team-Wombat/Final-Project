import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

const MODIFY_USER = gql`
  mutation modifyUser($userId: ID!, $userInput: UserInput!) {
    modifyUser(userId: $userId, userInput: $userInput) {
      username
      email
    }
  }
`;

const MODIFY_SKILL_RELATIONSHIP = gql`
  mutation modifySkillRelationship(
    $skillRelationshipId: ID!
    $skillRelationshipInput: SkillRelationshipInput!
  ) {
    modifySkillRelationship(
      skillRelationshipId: $skillRelationshipId
      skillRelationshipInput: $skillRelationshipInput
    ) {
      _id
    }
  }
`;

const ADD_SKILL_RELATIONSHIP = gql`
  mutation addSkillRelationship($input: SkillRelationshipInput!) {
    addSkillRelationship(input: $input) {
      _id
      skill {
        _id
        name
        description
      }
      yearsOfExperience
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation sendMessage($receiverId: ID!, $message: String!) {
    sendMessage(receiverId: $receiverId, message: $message) {
      _id
      sender {
        _id
      }
      receiver {
        _id
      }
      message
      timestamp
    }
  }
`;

export {
  LOGIN,
  ADD_USER,
  MODIFY_USER,
  MODIFY_SKILL_RELATIONSHIP,
  ADD_SKILL_RELATIONSHIP,
  ADD_MESSAGE,
};
