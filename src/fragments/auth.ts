import gql from "graphql-tag";

export const userFragment = gql`
  fragment User on UserMe {
    id
    email
    username
    firstName
    lastName
    gender
    dateOfBirth
  }
`;
