import { UserMe } from "src/fragments/gqlTypes/User";

export interface Login {
  signin: {
    jwt: string;
    user: UserMe;
  };
}

export interface LoginVariables_input {
  identifier: string;
  password: string;
  provider?: string;
}
export interface LoginVariables {
  input: LoginVariables_input;
}
