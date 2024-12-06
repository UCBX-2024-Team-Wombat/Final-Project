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
  mutation addUser($username: String!, $email: String!, $password: String!, $location: LocationInput!) {
    addUser(username: $username, email: $email, password: $password,  location: $location) {
      token
      user {
        _id
        location {
      city
      province
      state
      }
    }
  }
`;

export { LOGIN, ADD_USER };
