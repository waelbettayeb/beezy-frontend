import gql from "graphql-tag";

export const userFragment = gql`
  fragment User on UsersPermissionsUser {
    id
    email
    username
    firstName
    lastName
    gender
    dateOfBirth
  }
`;
