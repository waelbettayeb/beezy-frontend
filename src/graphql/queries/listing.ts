import gql from "graphql-tag";

export const listingQuery = gql`
  query Listing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      location {
        longitude
        latitude
      }
      images(limit: 10) {
        url
      }
      created_at
    }
  }
`;
