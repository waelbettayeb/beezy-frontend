import { User, UserMe } from "@graphql/fragments/gqlTypes/User";

export interface UpdateMeVariables {
  input: { data: User };
}

export interface UpdateMePayload {
  updateMe: { user: UserMe };
}
