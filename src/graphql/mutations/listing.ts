import gql from "graphql-tag";

export const CreateListingMutation = gql`
  mutation createListing($input: createListingInput) {
    createListing(input: $input) {
      listing {
        id
      }
    }
  }
`;
