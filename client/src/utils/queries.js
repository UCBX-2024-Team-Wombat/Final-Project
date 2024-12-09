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

export { QUERY_USER, QUERY_ME };
