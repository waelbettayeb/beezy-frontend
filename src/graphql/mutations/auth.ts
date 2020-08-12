import gql from "graphql-tag";

import { meFragment } from "@graphql/fragments/auth";

export const loginMutation = gql`
  ${meFragment}
  mutation Login($input: UsersPermissionsLoginInput!) {
    signin(input: $input) {
      jwt
      user {
        ...Me
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
        ...Me
      }
    }
  }
`;
