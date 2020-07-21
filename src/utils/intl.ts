import { defineMessages } from "react-intl";

export const errorMessages = defineMessages({
  emailTaken: {
    id: "Auth.form.error.email.taken",
    defaultMessage: "Email is already taken",
  },
  usernameTaken: {
    id: "Auth.form.error.username.taken",
    defaultMessage: "Username already taken",
  },
  registreDisabled: {
    id: "Auth.advanced.allow_register",
    defaultMessage: "Register action is currently disabled",
  },
  serverError: {
    defaultMessage: "A technical error has occurred",
  },
});
