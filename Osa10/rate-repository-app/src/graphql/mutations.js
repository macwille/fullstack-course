import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user:{username:$username, password:$password}) {
      id
    }
  }
`;

export const SIGN_IN = gql`
  mutation singIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;