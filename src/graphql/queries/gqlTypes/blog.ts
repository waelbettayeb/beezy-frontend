import { User } from "@graphql/fragments/gqlTypes/User";

export interface IArticlePayload {
  blogPost: {
    id: string;
    title: string;
    content?: string;
    created_at: Date;
  };
}
export interface IArticleVariables {
  id: string;
}
