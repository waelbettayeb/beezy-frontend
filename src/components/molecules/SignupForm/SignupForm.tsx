import React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Grid, Cell } from "baseui/layout-grid";
import { Form, Formik } from "formik";

import { Button, SIZE } from "baseui/button";
import * as Yup from "yup";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import { Display4, Paragraph3 } from "baseui/typography";
import { FormattedMessage, useIntl } from "react-intl";
import { Radio, RadioGroup } from "baseui/radio";
import { DatePicker } from "baseui/datepicker";

import { ErrorMessage } from "./ErrorMessage";
import { StyledLink } from "baseui/link";
import { toaster } from "baseui/toast";
import { errorMessages } from "@utils/intl";

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
  const month =
    Date.getMonth() < 10 ? `0${Date.getMonth() + 1}` : Date.getMonth();
  const date = Date.getDate();
  return `${year}-${month}-${date}`;
};
const SignupForm = (props) => {
  const auth = useAuth();
  const [signUp, { user, error, loading }] = auth.useSignUp();

  const intl = useIntl();
  const SignupSchema = Yup.object().shape({
    // username: Yup.string()
    //   .matches(
    //     /^(?=[a-zA-Z0-9._]+$)(?!.*[_.]{2})[^_.].*[^_.]$/g,
    //     "Invalid username"
    //   )
    //   .min(8, "Too Short!")
    //   .max(25, "Too Long!")
    //   .required("Required"),
    email: Yup.string()
      .email(intl.formatMessage(errorMessages.invalidEmail))
      .required(intl.formatMessage(errorMessages.required)),
    password: Yup.string()
      .min(8, intl.formatMessage({ defaultMessage: "Too Short!" }))
      .max(48, intl.formatMessage({ defaultMessage: "Too Long!" }))
      .required(intl.formatMessage(errorMessages.required)),
    firstName: Yup.string().required(
      intl.formatMessage(errorMessages.required)
    ),
    lastName: Yup.string().required(intl.formatMessage(errorMessages.required)),
    // phone: Yup.string()
    //   .matches(/^[0-9]{9}$/g, "Invalid phone number")
    //   .required("Required"),
  });

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
          }).then((res) => {
            toaster.info(
              intl.formatMessage({
                defaultMessage: "You are successfully registered",
              }),
              {}
            );
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
                <Cell span={[4, 8, 12]}>
                  <Display4 marginBottom="scale500">
                    <FormattedMessage defaultMessage="Create an account" />
                  </Display4>
                </Cell>
                <Cell span={[4, 4, 6]}>
                  <FormControl
                    label={intl.formatMessage({
                      defaultMessage: "First name",
                    })}
                    error={() =>
                      errors.firstName && touched.firstName && errors.firstName
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
                    label={intl.formatMessage({
                      defaultMessage: "Last name",
                    })}
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
                    label={intl.formatMessage({
                      defaultMessage: "Email",
                    })}
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
                </Cell>
                <Cell span={12}>
                  <FormControl
                    label={intl.formatMessage({
                      defaultMessage: "Password",
                    })}
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
                    label={intl.formatMessage({
                      defaultMessage: "Date of birth",
                    })}
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
                      error={errors.dateOfBirth && touched.dateOfBirth && true}
                    />
                  </FormControl>
                </Cell>
                <Cell span={[4, 4, 6]}>
                  <FormControl
                    label={intl.formatMessage({
                      defaultMessage: "Gender",
                    })}
                    error={errors.gender && touched.gender && errors.gender}
                  >
                    <RadioGroup
                      align="horizontal"
                      name="gender"
                      onChange={handleChange}
                      value={values.gender}
                      error={errors.gender && touched.gender}
                    >
                      <Radio value={GENDER.male}>
                        <FormattedMessage defaultMessage="Male" />
                      </Radio>
                      <Radio value={GENDER.female}>
                        <FormattedMessage defaultMessage="Female" />
                      </Radio>
                    </RadioGroup>
                  </FormControl>
                </Cell>

                <Cell span={12}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size={SIZE.large}
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
                    <FormattedMessage defaultMessage={"Create Account"} />
                  </Button>
                </Cell>
                <Cell span={12}>
                  <ErrorMessage errors={error} />
                </Cell>
                <Cell span={12}>
                  <Paragraph3>
                    <FormattedMessage defaultMessage="Already a member?" />{" "}
                    <StyledLink onClick={() => Router.push("/auth/signin")}>
                      <FormattedMessage defaultMessage="Sign In" />
                    </StyledLink>
                  </Paragraph3>
                </Cell>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default SignupForm;
