import { defineMessages, IntlShape } from "react-intl";

export const errorMessages = defineMessages({
  emailTaken: {
    id: "Auth.form.error.email.taken",
    defaultMessage: "Email is already taken.",
  },
});
