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
  invalidError: {
    defaultMessage: "Identifier or password invalid",
  },
  invalidEmail: {
    defaultMessage: "Invalid email",
  },
  userDosntExist: {
    defaultMessage: "This email does not exist.",
  },
  incorrectCode: {
    defaultMessage: "Password reset url is invalid or has expired.",
  },
  required: {
    defaultMessage: "Required",
  },
});
export const buttonMessages = defineMessages({
  submit: {
    defaultMessage: "Submit",
  },
  apply: {
    defaultMessage: "Apply",
  },
  cancel: {
    defaultMessage: "Cancel",
  },
  edit: {
    defaultMessage: "Edit",
  },
});
