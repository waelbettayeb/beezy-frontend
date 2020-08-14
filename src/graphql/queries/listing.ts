import { userFragment } from "@graphql/fragments/user";
import gql from "graphql-tag";

export const listingQuery = gql`
  ${userFragment}
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
        id
        url
      }
      created_at
      user {
        ...User
      }
    }
  }
`;
