import { UsersPermissionsMe } from "src/fragments/gqlTypes/User";

export interface UsersPermissionsLoginPayload {
  register: {
    jwt: string;
    user: UsersPermissionsMe;
  };
}

export interface UsersPermissionsRegisterInput {
  identifier: string;
  password: string;
  email: string;
}
export interface SignUpVariables {
  input: UsersPermissionsRegisterInput;
}
