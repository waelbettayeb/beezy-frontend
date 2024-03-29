import gql from "graphql-tag";
import { userFragment } from "@graphql/fragments/user";
import { meFragment } from "@graphql/fragments/auth";

export const meQuery = gql`
  ${meFragment}
  query Me {
    _me {
      ...Me
    }
  }
`;
export const userQuery = gql`
  ${userFragment}
  query User($id: ID!) {
    user(id: $id) {
      ...User
    }
  }
`;
