import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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
  mutation modifyUser($userId: ID!, $password: String) {
    modifyUser(userId: $userId, password: $password) {
        password
    }
  }
`

export { LOGIN, ADD_USER, MODIFY_USER };
