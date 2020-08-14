import React from "react";
import { Display4, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useAuth } from "src/hooks/useAuth";
import Divider from "@components/atoms/Divider";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import ErrorMessage from "../SignupForm/ErrorMessage";
import { Block } from "baseui/block";
import { toaster } from "baseui/toast";

interface Props {
  onCompleted?: () => void;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const { onCompleted } = props;
  const router = useRouter();

  const auth = useAuth();
  const [signIn, { user, error, loading }] = auth.useSignIn();

  const initialValues = {
    identifier: "",
    password: "",
  };
  const showToast = () => toaster.info("You are successfully logged in", {});

  return user ? (
    <span>authentificated</span>
  ) : (
    <React.Fragment>
      <Display4 marginBottom="scale500">Login</Display4>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          signIn({
            variables: {
              input: {
                identifier: values.identifier,
                password: values.password,
              },
            },
          }).then((res) => {
            showToast();
            onCompleted && onCompleted();
          });
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <FormControl
                label={() => "Username"}
                error={
                  errors.identifier && touched.identifier && errors.identifier
                }
              >
                <Input
                  type="text"
                  name="identifier"
                  disabled={loading || isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.identifier}
                  error={errors.identifier && touched.identifier}
                />
              </FormControl>
              <FormControl
                disabled={loading || isSubmitting}
                label={() => "Password"}
                error={errors.password && touched.password && errors.password}
              >
                <Input
                  type="password"
                  name="password"
                  disabled={loading}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password}
                />
              </FormControl>
              <Button
                isLoading={loading}
                disabled={
                  loading ||
                  isSubmitting ||
                  !values.identifier ||
                  !values.password
                }
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
              <ErrorMessage errors={error} />
            </Form>
          );
        }}
      </Formik>
      <Block>
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
      </Block>
    </React.Fragment>
  );
};

export default LoginForm;
