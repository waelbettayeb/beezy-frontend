import { UsersPermissionsMe } from "src/fragments/gqlTypes/User";

export interface UsersPermissionsLoginPayload {
  signup: {
    jwt: string;
    user: UsersPermissionsMe;
  };
}

export interface UsersPermissionsSignUpInput {
  email: string;
  password: string;
  firstName: String;
  lastName: String;
  gender: GENDER;
  dateOfBirth: Date;
}
export interface SignUpVariables {
  input: UsersPermissionsSignUpInput;
}
enum GENDER {
  male,
  female,
}
