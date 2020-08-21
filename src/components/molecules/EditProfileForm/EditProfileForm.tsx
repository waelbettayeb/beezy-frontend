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

import { Textarea } from "baseui/textarea";
import { useMutation } from "@apollo/react-hooks";
import { UpdateMeVariables } from "@graphql/mutations/gqlTypes/User";
import { updateMeMutation } from "@graphql/mutations/user";
import { toaster } from "baseui/toast";

export interface IFormValues {
  email: string;
  bio: string;
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
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});
const EditProfileForm = (props) => {
  const auth = useAuth();
  const { user } = props;
  const intl = useIntl();
  const [updateMe, { data, error, loading }] = auth.useUpdateUser();
  const initialValues: IFormValues = {
    email: user?.email,
    bio: user.bio,
    firstName: user?.firstName,
    lastName: user?.lastName,
    gender: user?.gender ?? GENDER.male,
    dateOfBirth: user?.dateOfBirth
      ? new Date(`${user.dateOfBirth}T00:00:00.000Z`)
      : new Date(),
  };
  const [date, setDate] = React.useState([
    new user()?.dateOfBirth
      ? new Date(`${user.dateOfBirth}T00:00:00.000Z`)
      : new Date(),
  ]);
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          updateMe({
            variables: {
              input: {
                data: {
                  ...values,
                  dateOfBirth: formateDate(date[0]),
                },
              },
            },
          }).then((res) => {
            toaster.info("Profile saved.", {});
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
                  <Display4 marginBottom="scale500">Edit Profile</Display4>
                </Cell>
                <Cell span={[4, 4, 6]}>
                  <FormControl
                    label={() => "First name"}
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
                    label={() => "Bio"}
                    error={errors.bio && touched.bio && errors.bio}
                  >
                    <Textarea
                      type="bio"
                      name="bio"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bio}
                      error={errors.bio && touched.bio}
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
                      value={date}
                      onChange={({ date }) =>
                        setDate(Array.isArray(date) ? date : [date])
                      }
                      maxDate={new Date()}
                      error={errors.dateOfBirth && touched.dateOfBirth && true}
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
                    <FormattedMessage defaultMessage={"Submit"} />
                  </Button>
                </Cell>
                {/* <Cell span={12}>
                  <ErrorMessage errors={error} />
                </Cell> */}
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default EditProfileForm;
