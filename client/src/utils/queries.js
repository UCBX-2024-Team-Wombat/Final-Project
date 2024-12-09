import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      gender
      description
      meetingPreference
      availableSkills
      desiredSkills
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
      availableSkills
      desiredSkills
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

export { QUERY_USER, QUERY_ME, QUERY_SKILLRELATIONSHIPS };
