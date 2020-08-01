import gql from "graphql-tag";
import { userFragment } from "../fragments/auth";

export const userQuery = gql`
  ${userFragment}
  query Me {
    _me {
      ...User
    }
  }
`;
