import gql from "graphql-tag";

export const recoverPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;
