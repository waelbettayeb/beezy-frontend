import { defineMessages, IntlShape } from "react-intl";

export const errorMessages = defineMessages({
  emailTaken: {
    id: "Auth.form.error.email.taken",
    defaultMessage: "Email is already taken",
  },
  usernameTaken: {
    id: "Auth.form.error.username.taken",
    defaultMessage: "Username already taken",
  },
});
