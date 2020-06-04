import React from "react";
import { Display2, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SHAPE } from "baseui/button";
import { StyledLink } from "baseui/link";

interface Props {}

const LoginForm = (props: Props) => {
  return (
    <React.Fragment>
      <Display2 marginBottom="scale500">Login</Display2>
      <FormControl label={() => "Username"} caption={() => "caption"}>
        <Input />
      </FormControl>
      <FormControl label={() => "Password"} caption={() => "caption"}>
        <Input type="password" />
      </FormControl>
      <Button onClick={() => null}>Sign in</Button>
      <Paragraph3>
        Don't have an account? <StyledLink href="/about">Sign up</StyledLink>
      </Paragraph3>
      <Paragraph3>
        Have you forgotten your password?{" "}
        <StyledLink href="/about">Click Here</StyledLink>
      </Paragraph3>
    </React.Fragment>
  );
};

export default LoginForm;
