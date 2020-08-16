import React from "react";
import { Display4, Paragraph3 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useAuth } from "src/hooks/useAuth";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import ErrorMessage from "../SignupForm/ErrorMessage";
import { Block } from "baseui/block";
import { toaster } from "baseui/toast";

interface Props {
}
export interface IFormValues {
  email: string;
}

const RecoverPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const RecoverPasswordForm: React.FC<Props> = (props: Props) => {

  const router = useRouter();

  // const [signIn, { user, error, loading }] = auth.useSignIn();

  const initialValues: IFormValues = {
    email: "",
  };


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
         }
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
          <StyledLink onClick={() => router.push("/auth/signup")}>
            Sign up now
          </StyledLink>
        </Paragraph3>
      </Block>
    </React.Fragment>
  );
};

export default RecoverPasswordForm;
