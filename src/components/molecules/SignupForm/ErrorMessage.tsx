import React, { ReactNode } from "react";

import { errorMessages } from "@utils/intl";
import { Paragraph4 } from "baseui/typography";
import { default as Em } from "@components/atoms/ErrorMessage";
import { FormattedMessage, useIntl } from "react-intl";

interface ErrorMessageProps {
  errors: any;
  children?: ReactNode;
}
export const getErrorMessage = (errors) => {
  const id =
    errors?.graphQLErrors[0]?.extensions?.exception?.data?.message[0]
      ?.messages[0]?.id;
  switch (id) {
    case "Auth.form.error.email.taken":
      return errorMessages.emailTaken;
    case "Auth.form.error.username.taken":
      return errorMessages.usernameTaken;
    case "Auth.advanced.allow_register":
      return errorMessages.registreDisabled;
    case "Auth.form.error.invalid":
      return errorMessages.invalidError;
    case "Auth.form.error.user.not-exist":
      return errorMessages.userDosntExist;
    case "Auth.form.error.code.provide":
      return errorMessages.incorrectCode;
    default:
      return errorMessages.serverError;
  }
};

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { errors } = props;
  const intl = useIntl();
  const message = getErrorMessage(errors);
  return errors ? (
    <Em>{intl.formatMessage(message)}</Em>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default ErrorMessage;
