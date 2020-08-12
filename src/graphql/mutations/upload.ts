import gql from "graphql-tag";

export const UploadFilesMutation = gql`
  mutation UploadFiles($files: [Upload]!, $path: String) {
    UploadFiles(files: $files, path: $path) {
      id
      url
    }
  }
`;
