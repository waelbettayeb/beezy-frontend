export interface MultipleUploadPayload {
  UploadFiles: {
    id: string;
    url: string;
  };
}

export interface MultipleUploadVariables {
  files: File[];
  path?: string;
}
