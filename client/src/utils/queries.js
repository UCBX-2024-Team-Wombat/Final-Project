import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

const QUERY_SKILLRELATIONSHIPS = gql`
query GetSkillRelationships {
  getSkillRelationships {
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
