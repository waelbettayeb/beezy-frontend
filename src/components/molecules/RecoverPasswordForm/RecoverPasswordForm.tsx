import React from "react";
import { Display4, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useAuth } from "src/hooks/useAuth";
import * as Yup from "yup";
import Router from "next/router";
import { Formik, Form } from "formik";
import ErrorMessage from "../SignupForm/ErrorMessage";
import { Block } from "baseui/block";
import { toaster } from "baseui/toast";
import { useMutation } from "react-apollo";
import {
  RecoverPasswordPayload,
  RecoverPasswordVariables,
} from "@graphql/mutations/gqlTypes/RecoverPassword";
import { recoverPasswordMutation } from "@graphql/mutations/recover_password";

interface Props {}
export interface IFormValues {
  email: string;
}

const RecoverPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const RecoverPasswordForm: React.FC<Props> = (props: Props) => {
  const auth = useAuth();
  const [RecoverPassword, { data, error, loading }] = useMutation<
    RecoverPasswordPayload,
    RecoverPasswordVariables
  >(recoverPasswordMutation);

  const initialValues: IFormValues = {
    email: "",
  };
  const showToast = () =>
    toaster.info("Please check your email for a message with your code", {});

  return (
    <React.Fragment>
      <Display4 marginBottom="scale500">Forgot Password?</Display4>
      <Paragraph3>
        Enter the email address you used when you joined and we’ll send you
        instructions to reset your password.
      </Paragraph3>
      <Paragraph3>
        For security reasons, we do NOT store your password. So rest assured
        that we will never send your password via email.
      </Paragraph3>
      <Formik
        initialValues={initialValues}
        validationSchema={RecoverPasswordSchema}
        onSubmit={(values, actions) => {
          RecoverPassword({
            variables: {
              email: values.email,
            },
          }).then((res) => {
            Router.push("/");
            showToast();
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
                label={() => "Email"}
                error={errors.email && touched.email && errors.email}
              >
                <Input
                  type="text"
                  name="email"
                  disabled={loading || isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email}
                />
              </FormControl>

              <Button
                isLoading={loading}
                disabled={loading || isSubmitting}
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
                Send Reset instructions
              </Button>
              <ErrorMessage errors={error} />
            </Form>
          );
        }}
      </Formik>
      <Block>
        <Paragraph3>
          Not a member?{" "}
          <StyledLink onClick={() => Router.push("/auth/signup")}>
            Sign up now
          </StyledLink>
        </Paragraph3>
      </Block>
    </React.Fragment>
  );
};

export default RecoverPasswordForm;
