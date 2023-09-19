import { gql } from "@apollo/client";

<<<<<<< HEAD
export const AUTHORIZE = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: {username: $username, password: $password }) {
      accessToken
    }
  }
`;

=======
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user:{username:$username, password:$password}) {
      id
    }
  }
`;

<<<<<<< HEAD
export const CREATE_REVIEW = gql`
  mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review:{repositoryName:$repositoryName, ownerName:$ownerName, rating:$rating, text:$text}) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) { 
    deleteReview(id:$id) 
  }
=======
export const SIGN_IN = gql`
  mutation singIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
`;