import { UsersPermissionsMe } from "fragments/gqlTypes/User";

export interface Login {
  jwt: string;
  user: UsersPermissionsMe;
}

export interface LoginVariables_input {
  identifier: string;
  password: string;
  provider: string | null;
}
export interface LoginVariables {
  input: LoginVariables_input;
}
