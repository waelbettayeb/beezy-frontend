import gql from "graphql-tag";

export const articleQuery = gql`
  query Article($id: ID!) {
    blogPost(id: $id) {
      id
      title
      content
      created_at
    }
  }
`;
