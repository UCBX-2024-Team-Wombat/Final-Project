import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      gender
      description
      meetingPreference
    }
  }
`;

const QUERY_ALL_USERS = gql`
  query allUsers {
    allUsers {
      _id
      username
      email
      gender
      description
      meetingPreference
    }
  }
`;

const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      gender
      description
      meetingPreference
    }
  }
`;

const QUERY_SKILLRELATIONSHIPS = gql`
query GetSkillRelationships ($userId: ID!) {
  getSkillRelationships (userId: $userId) {
    yearsOfExperience
    areasOfExpertise
    skill {
      name
      description
    }
    user {
      _id
      username
      email
      password
    }
  }
}
`;

export { QUERY_USER, QUERY_ME, QUERY_SKILLRELATIONSHIPS, QUERY_ALL_USERS };
