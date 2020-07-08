import gql from "graphql-tag";

export const userFragment = gql`
  fragment User on UsersPermissionsMe {
    id
    email
    username
  }
`;
