import gql from "graphql-tag";
import { userFragment } from "../fragments/auth";

export const loginMutation = gql`
  ${userFragment}
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        ...User
      }
    }
  }
`;
export const registerMutation = gql`
  ${userFragment}
  mutation Register($input: UsersPermissionsSignUpInput!) {
    signup(input: $input) {
      jwt
      user {
        ...User
      }
    }
  }
`;
