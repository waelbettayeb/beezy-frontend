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
export const UpdateListingMutation = gql`
  mutation updateListingMutation($input: updateListingInput!) {
    updateListing(input: $input) {
      listing {
        id
      }
    }
  }
`;
