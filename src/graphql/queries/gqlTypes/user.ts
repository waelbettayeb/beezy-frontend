import { UserMe } from "@graphql/fragments/gqlTypes/User";

export interface Me {
  _me?: {
    jwt?: string;
    user?: UserMe;
  };
}
