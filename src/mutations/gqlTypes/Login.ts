import { UsersPermissionsMe } from "src/fragments/gqlTypes/User";

export interface Login {
  login: {
    jwt: string;
    user: UsersPermissionsMe;
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
