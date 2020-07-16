import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Grid, Cell } from "baseui/layout-grid";
import { Formik } from "formik";
import React from "react";
import { PhoneInputNext, COUNTRIES, PhoneInput } from "baseui/phone-input";
import { Button } from "baseui/button";
import * as Yup from "yup";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";

interface Props {}
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(?=[a-zA-Z0-9._]+$)(?!.*[_.]{2})[^_.].*[^_.]$/g,
      "Invalid username"
    )
    .min(8, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  firstName: Yup.string()
    .min(6, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(48, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().matches(/^[0-9]{9}$/g, "Invalid phone number"),
});
const SignupForm = (props: Props) => {
  const auth = useAuth();
  const [signUp, { user, error, loading }] = auth.useSignUp();
  if (user) Router.push("/");
  return (
    <React.Fragment>
      <Grid>
        <Cell span={4}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              phone: "",
            }}
            validationSchema={SignupSchema}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.username) {
            //     errors.username = "Required";
            //   }
            //   if (!values.password) {
            //     errors.password = "Required";
            //   }
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              signUp({ variables: { input: { ...values } } });
              setSubmitting(false);
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
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  label={() => "Username"}
                  error={() =>
                    errors.username && touched.username && errors.username
                  }
                >
                  <Input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={errors.username && touched.username}
                  />
                </FormControl>
                <FormControl
                  label={() => "Email"}
                  error={() => errors.email && touched.email && errors.email}
                >
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email}
                  />
                </FormControl>
                <FormControl
                  label={() => "Password"}
                  error={errors.password && touched.password && errors.password}
                >
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password && touched.password}
                  />
                </FormControl>
                <FormControl
                  label={() => "Phone"}
                  error={errors.phone && touched.phone && errors.phone}
                >
                  <Input
                    type={"tel"}
                    name="phone"
                    startEnhancer={"+213"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    error={errors.phone && touched.phone}
                  />
                </FormControl>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    signUp({
                      variables: {
                        input: {
                          username: values.username,
                          email: values.email,
                          password: values.password,
                        },
                      },
                    });
                  }}
                >
                  Sign up
                </Button>
              </form>
            )}
          </Formik>
        </Cell>
      </Grid>
    </React.Fragment>
  );
};

export default SignupForm;
