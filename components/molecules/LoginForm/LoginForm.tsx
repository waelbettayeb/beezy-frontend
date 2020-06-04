import React from "react";
import { Display2, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useAuth } from "@hooks/useAuth";
import { error } from "console";

interface Props {}

const LoginForm: React.FC = (props: Props) => {
  const auth = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setUsername(value);
  };
  const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setPassword(value);
  };

  const usernameError = (errors) => {
    return errors
      ? errors.find((element) => element.id === "Auth.form.error.email.provide")
          ?.message
      : "";
  };
  const passwordError = (errors) => {
    return errors
      ? errors.find(
          (element) => element.id === "Auth.form.error.password.provide"
        )?.message
      : "";
  };
  return auth.user ? (
    <span>authentificated</span>
  ) : (
    <React.Fragment>
      <Display2 marginBottom="scale500">Login</Display2>
      <FormControl label={() => "Username"} error={usernameError(auth.errors)}>
        <Input
          disabled={auth.loading}
          value={username}
          onChange={onUsernameChange}
          error={usernameError(auth.errors)}
        />
      </FormControl>
      <FormControl
        disabled={auth.loading}
        label={() => "Password"}
        error={passwordError(auth.errors)}
      >
        <Input
          type="password"
          value={password}
          onChange={onPasswordChange}
          error={passwordError(auth.errors)}
        />
      </FormControl>
      <Button
        isLoading={auth.loading}
        onClick={() => auth.signin(username, password)}
      >
        Sign in
      </Button>

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
