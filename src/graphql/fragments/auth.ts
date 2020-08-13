import gql from "graphql-tag";

export const meFragment = gql`
  fragment Me on UserMe {
    id
    email
    username
    firstName
    lastName
    gender
    dateOfBirth
    avatar {
      url
    }
  }
`;
