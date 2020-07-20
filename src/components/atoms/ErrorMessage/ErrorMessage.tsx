import React from "react";
import { Paragraph4 } from "baseui/typography";
import { useStyletron } from "baseui";

const ErrorMessage: React.FC = (props) => {
  const [css, theme] = useStyletron();
  return (
    <Paragraph4 color={theme.colors.negative}>{props.children}</Paragraph4>
  );
};

export default ErrorMessage;
