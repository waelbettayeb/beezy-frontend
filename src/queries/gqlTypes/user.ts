import { UserMe } from "src/fragments/gqlTypes/User";

export interface Me {
  _me: {
    jwt: string;
    user: UserMe;
  };
}
