import React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Grid, Cell } from "baseui/layout-grid";
import { Form, Formik } from "formik";

import { Button } from "baseui/button";
import * as Yup from "yup";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import { Display2 } from "baseui/typography";
import { useIntl } from "react-intl";
import { Radio, RadioGroup } from "baseui/radio";
import { DatePicker } from "baseui/datepicker";

import { ErrorMessage } from "./ErrorMessage";

export interface IFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  dateOfBirth: Date;
}
enum GENDER {
  male = "male",
  female = "female",
}
const formateDate = (Date) => {
  const year = Date.getFullYear();
  const month = Date.getMonth() < 10 ? "0" + Date.getMonth() : Date.getMonth();
  const date = Date.getDate();
  return `${year}-${month}-${date}`;
};
const SignupSchema = Yup.object().shape({
  // username: Yup.string()
  //   .matches(
  //     /^(?=[a-zA-Z0-9._]+$)(?!.*[_.]{2})[^_.].*[^_.]$/g,
  //     "Invalid username"
  //   )
  //   .min(8, "Too Short!")
  //   .max(25, "Too Long!")
  //   .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(48, "Too Long!")
    .required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  // phone: Yup.string()
  //   .matches(/^[0-9]{9}$/g, "Invalid phone number")
  //   .required("Required"),
});
const SignupForm = (props) => {
  const auth = useAuth();
  const [signUp, { user, error, loading }] = auth.useSignUp();
  // if (user) Router.push("/");

  const intl = useIntl();

  const initialValues: IFormValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: GENDER.male,
    dateOfBirth: new Date(),
  };
  return (
    <React.Fragment>
      <Grid>
        <Cell span={6}>
          <Display2 marginBottom="scale500">Create an account</Display2>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              signUp({
                variables: {
                  input: {
                    ...values,
                    dateOfBirth: formateDate(values.dateOfBirth),
                  },
                },
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
                  <Grid gridMargins={0} gridGaps={0}>
                    <Cell span={[4, 4, 6]}>
                      <FormControl
                        label={() => "First name"}
                        error={() =>
                          errors.firstName &&
                          touched.firstName &&
                          errors.firstName
                        }
                      >
                        <Input
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          error={errors.firstName && touched.firstName}
                        />
                      </FormControl>
                    </Cell>
                    <Cell span={[4, 4, 6]}>
                      <FormControl
                        label={() => "Last name"}
                        error={() =>
                          errors.lastName && touched.lastName && errors.lastName
                        }
                      >
                        <Input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          error={errors.lastName && touched.lastName}
                        />
                      </FormControl>
                    </Cell>
                    <Cell span={12}>
                      <FormControl
                        label={() => "Email"}
                        error={() =>
                          errors.email && touched.email && errors.email
                        }
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
                    </Cell>
                    <Cell span={12}>
                      <FormControl
                        label={() => "Password"}
                        error={
                          errors.password && touched.password && errors.password
                        }
                      >
                        <Input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          error={errors.password && touched.password}
                          placeholder="8+ characters"
                        />
                      </FormControl>
                    </Cell>
                    <Cell span={[4, 4, 6]}>
                      <FormControl
                        label={() => "Date of birth"}
                        error={
                          errors.dateOfBirth &&
                          touched.dateOfBirth &&
                          errors.dateOfBirth
                        }
                      >
                        <DatePicker
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          maxDate={new Date()}
                          error={
                            errors.dateOfBirth && touched.dateOfBirth && true
                          }
                        />
                      </FormControl>
                    </Cell>
                    <Cell span={[4, 4, 6]}>
                      <FormControl
                        label={() => "Gender"}
                        error={errors.gender && touched.gender && errors.gender}
                      >
                        <RadioGroup
                          align="horizontal"
                          name="gender"
                          onChange={handleChange}
                          value={values.gender}
                          error={errors.gender && touched.gender}
                        >
                          <Radio value={GENDER.male}>Male</Radio>
                          <Radio value={GENDER.female}>Female</Radio>
                        </RadioGroup>
                      </FormControl>
                    </Cell>

                    <Cell span={12}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
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
                        Sign up
                      </Button>
                    </Cell>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
          <ErrorMessage errors={error} />
        </Cell>
      </Grid>
    </React.Fragment>
  );
};

export default SignupForm;
