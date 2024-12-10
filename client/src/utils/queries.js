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
    }
  }
`;
//add these back in when incorporated in user.js
//availableSkills
//desiredSkills

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
//add these back in when incorporated in user.js
// availableSkills
// desiredSkills

const QUERY_SKILLRELATIONSHIPS = gql`
  query GetSkillRelationships($userId: ID!) {
    getSkillRelationships(userId: $userId) {
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

const QUERY_SKILLS_BY_NAME = gql`
  query skillsByName($searchString: String!) {
    skillsByName(searchString: $searchString) {
      name
      description
      _id
    }
  }
`;

export { QUERY_USER, QUERY_ME, QUERY_SKILLRELATIONSHIPS, QUERY_SKILLS_BY_NAME };
