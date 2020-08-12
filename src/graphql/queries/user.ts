import gql from "graphql-tag";
import { userFragment } from "@graphql/fragments/User";
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
  query Use($id: ID!) {
    user(id: $id) {
      ...User
      bio
    }
  }
`;
