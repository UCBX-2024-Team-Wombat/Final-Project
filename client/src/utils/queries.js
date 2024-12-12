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
      city
      stateOrProvince
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
      city
      stateOrProvince
      description
      meetingPreference
    }
  }
`;
//add these back in when incorporated in user.js
// availableSkills
// desiredSkills

const QUERY_SKILL_RELATIONSHIPS_BY_USER_ID = gql`
  query getSkillRelationshipsByUserId($userId: ID!) {
    getSkillRelationshipsByUserId(userId: $userId) {
      _id
      yearsOfExperience
      offered
      offeredText
      desired
      desiredText
      skill {
        _id
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

const QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA = gql`
  query getSkillRelationshipsBySearchCriteria(
    $skillIds: [ID]!
    $userFilterInput: UserFilterInput
  ) {
    getSkillRelationshipsBySearchCriteria(
      skillIds: $skillIds
      userFilterInput: $userFilterInput
    ) {
      _id
      yearsOfExperience
      offered
      offeredText
      desired
      desiredText
      skill {
        _id
        name
        description
      }
      user {
        _id
        username
        gender
        meetingPreference
        city
        stateOrProvince
        country
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

export {
  QUERY_USER,
  QUERY_ME,
  QUERY_SKILL_RELATIONSHIPS_BY_USER_ID,
  QUERY_SKILLS_BY_NAME,
  QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA,
};
