import React from "react";
import { Display4, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useAuth } from "src/hooks/useAuth";
import Divider from "@components/atoms/Divider";
import { useRouter } from "next/router";

interface Props {
  onCompleted?: () => void;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const { onCompleted } = props;
  const router = useRouter();

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
      <Display4 marginBottom="scale500">Login</Display4>
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
      <Button
        isLoading={loading}
        onClick={() => {
          signIn().then((res) => onCompleted());
        }}
        disabled={loading || identifier == "" || password == ""}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => {
              return {
                width: "100%",
              };
            },
          },
        }}
      >
        Sign in
      </Button>

      <Paragraph3>
        Don't have an account?{" "}
        <StyledLink onClick={() => router.push("/auth/signup")}>
          Sign up
        </StyledLink>
      </Paragraph3>
      <Paragraph3>
        Have you forgotten your password?{" "}
        <StyledLink href="/about">Click Here</StyledLink>
      </Paragraph3>
      <Divider>Or</Divider>
      <Button
        isLoading={loading}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => {
              return {
                width: "100%",
              };
            },
          },
        }}
      >
        Sign in with Facebook
      </Button>
    </React.Fragment>
  );
};

export default LoginForm;
