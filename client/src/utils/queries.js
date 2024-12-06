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
      location {
      city
      province
      state
    }

    }
  }
`;

export { QUERY_USER, QUERY_ME };
