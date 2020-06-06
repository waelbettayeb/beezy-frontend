import React from "react";
import { Display2, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useAuth } from "@hooks/useAuth";

interface Props {}

const LoginForm: React.FC = (props: Props) => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useAuth();
  const [signIn, { user, error, loading }] = auth.useSignIn({
    input: { identifier, password },
  });

  const onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setIdentifier(value);
  };
  const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setPassword(value);
  };

  const identifierError = (errors) => {
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
  return user ? (
    <span>authentificated</span>
  ) : (
    <React.Fragment>
      <Display2 marginBottom="scale500">Login</Display2>
      <FormControl label={() => "Username"}>
        <Input
          disabled={loading}
          value={identifier}
          onChange={onUsernameChange}
        />
      </FormControl>
      <FormControl disabled={loading} label={() => "Password"}>
        <Input type="password" value={password} onChange={onPasswordChange} />
      </FormControl>
      <Button isLoading={loading} onClick={() => signIn()}>
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
