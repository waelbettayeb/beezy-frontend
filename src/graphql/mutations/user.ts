import { userFragment } from "@graphql/fragments/user";
import gql from "graphql-tag";

export const updateMeMutation = gql`
  ${userFragment}

  mutation updateMeMutation($input: updateUserInput!) {
    updateMe(input: $input) {
      user {
        ...User
      }
    }
  }
`;
