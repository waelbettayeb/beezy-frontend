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
import { useStyletron } from "baseui";
import {
  FacebookFilled,
  GoogleCircleFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { meQuery } from "@graphql/queries/user";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
  onCompleted?: () => void;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const { onCompleted } = props;
  const router = useRouter();
  const [css, theme] = useStyletron();

  const auth = useAuth();
  const [signIn, { user, error, loading }] = auth.useSignIn();

  const initialValues = {
    identifier: "",
    password: "",
  };
  const showToast = () =>
    toaster.info(
      intl.formatMessage({ defaultMessage: "You are successfully logged in" }),
      {}
    );
  const intl = useIntl();
  return user ? (
    <span>authentificated</span>
  ) : (
    <React.Fragment>
      <Display4 marginBottom="scale500">
        <FormattedMessage defaultMessage="Login" />
      </Display4>
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
            localStorage.setItem("token", res?.data.signin?.jwt);
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
                label={intl.formatMessage({ defaultMessage: "Username" })}
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
                label={intl.formatMessage({ defaultMessage: "Password" })}
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
                <FormattedMessage defaultMessage="Sign in" />
              </Button>
              <ErrorMessage errors={error} />
            </Form>
          );
        }}
      </Formik>
      <Block>
        <Paragraph3>
          <FormattedMessage defaultMessage="Don't have an account?" />{" "}
          <StyledLink onClick={() => router.push("/auth/signup")}>
            <FormattedMessage defaultMessage="Sign up" />
          </StyledLink>
        </Paragraph3>
        <Paragraph3>
          <FormattedMessage defaultMessage="Have you forgotten your password?" />{" "}
          <StyledLink onClick={() => router.push("/auth/recover_password")}>
            <FormattedMessage defaultMessage="Click Here" />
          </StyledLink>
        </Paragraph3>
        <Divider>
          <FormattedMessage defaultMessage="Or" />
        </Divider>
        <Button
          startEnhancer={() => <FacebookFilled />}
          onClick={() =>
            router.push(`${process.env.NEXT_PUBLIC_API_URI}/connect/facebook/`)
          }
          overrides={{
            BaseButton: {
              style: ({ $theme }) => {
                return {
                  width: "100%",
                  marginBottom: theme.sizing.scale400,
                };
              },
            },
          }}
        >
          <FormattedMessage defaultMessage="Sign in with Facebook" />
        </Button>
        {/* <Button
          startEnhancer={() => <GoogleOutlined />}
          onClick={() =>
            router.push(`${process.env.NEXT_PUBLIC_API_URI}/connect/google/`)
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
          Sign in with Google
        </Button> */}
      </Block>
    </React.Fragment>
  );
};

export default LoginForm;
