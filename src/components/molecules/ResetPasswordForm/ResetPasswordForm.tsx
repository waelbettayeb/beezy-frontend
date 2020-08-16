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
  ResetPasswordPayload,
  ResetPasswordVariables,
} from "@graphql/mutations/gqlTypes/RecoverPassword";
import {
  recoverPasswordMutation,
  resetPasswordMutation,
} from "@graphql/mutations/recover_password";
import { setAuthToken } from "@utils/auth";

interface Props {}
export interface IFormValues {
  password: string;
}

const RecoverPasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
});

const ResetPasswordForm: React.FC<Props> = (props: Props) => {
  const auth = useAuth();
  const { code } = Router.query;
  const [ResetPassword, { data, error, loading }] = useMutation<
    ResetPasswordPayload,
    ResetPasswordVariables
  >(resetPasswordMutation);

  const initialValues: IFormValues = {
    password: "",
  };
  const showToast = () =>
    toaster.info("Your password has been changed successfully", {});
  return (
    <React.Fragment>
      <Display4 marginBottom="scale500">Reset your password</Display4>
      <Formik
        initialValues={initialValues}
        validationSchema={RecoverPasswordSchema}
        onSubmit={(values, actions) => {
          ResetPassword({
            variables: {
              password: values.password,
              passwordConfirmation: values.password,
              code: code as string,
            },
          }).then((res) => {
            setAuthToken(
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTU5NzMzNDQyMSwiZXhwIjoxNTk5OTI2NDIxfQ.lrPEHTNGg8ac-3tLvD_bGjtJcgo7EJygXXhZibdVADE",
              () => auth.getUser()
            );
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
                label={() => "New Password"}
                error={errors.password && touched.password && errors.password}
              >
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password}
                  placeholder="Minimum 8 characters"
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
                Reset Password
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

export default ResetPasswordForm;
