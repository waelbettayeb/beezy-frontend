import { User, UserMe } from "@graphql/fragments/gqlTypes/User";

export interface RecoverPasswordVariables {
  email: string;
}

export interface RecoverPasswordPayload {
  forgotPassword: { ok: boolean };
}
export interface ResetPasswordVariables {
  password: string;
  passwordConfirmation: string;
  code: string;
}
export interface ResetPasswordPayload {
  jwt: string;
}
