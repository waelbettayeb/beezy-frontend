import gql from "graphql-tag";
import { meFragment } from "../fragments/auth";

export const loginMutation = gql`
  ${meFragment}
  mutation Login($input: UsersPermissionsLoginInput!) {
    signin(input: $input) {
      jwt
      user {
        ...User
      }
    }
  }
`;
export const registerMutation = gql`
  ${meFragment}
  mutation Register($input: UsersPermissionsSignUpInput!) {
    signup(input: $input) {
      jwt
      user {
        ...User
      }
    }
  }
`;
