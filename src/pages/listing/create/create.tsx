import React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Cell, Grid } from "baseui/layout-grid";
import { Caption2, Display4, Label1 } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Block } from "baseui/block";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import { Button } from "baseui/button";
import { useMutation } from "@apollo/react-hooks";
import {
  MultipleUploadPayload,
  MultipleUploadVariables,
} from "@graphql/mutations/gqlTypes/Upload";
import { UploadFilesMutation } from "src/graphql/mutations/upload";
import { useAuth } from "@hooks/useAuth";

import ImagesUploader from "@components/molecules/ImagesUploader/ImagesUploader";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CreateListingPayload,
  CreateListingVariables,
} from "@graphql/mutations/gqlTypes/Listing";
import { CreateListingMutation } from "@graphql/mutations/listing";
import MapLocationPicker, {
  simpleReverseGeocoding,
} from "@components/molecules/MapLocationPicker";
import dynamic from "next/dynamic";
import { toaster } from "baseui/toast";
import Router from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { buttonMessages, errorMessages } from "@utils/intl";

const create = () => {
  const intl = useIntl();
  const CreateListingSchema = Yup.object().shape({
    title: Yup.string()
      .max(
        25,
        intl.formatMessage({
          defaultMessage: "max number of characters is 25",
        })
      )
      .required(intl.formatMessage(errorMessages.required)),
    description: Yup.string().required(
      intl.formatMessage(errorMessages.required)
    ),
    latitude: Yup.number().required(intl.formatMessage(errorMessages.required)),
    longitude: Yup.number().required(
      intl.formatMessage(errorMessages.required)
    ),
    images: Yup.array()
      .of(
        Yup.object().shape({
          url: Yup.string().required(),
          id: Yup.string().required(),
        })
      )
      .min(1, intl.formatMessage(errorMessages.required)),
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const [CreatListing, CreatListingMutationTuplet] = useMutation<
    CreateListingPayload,
    CreateListingVariables
  >(CreateListingMutation);
  const [uploadFiles, uploadMutationTuplet] = useMutation<
    MultipleUploadPayload,
    MultipleUploadVariables
  >(UploadFilesMutation);
  const { user } = useAuth();
  var initialValues = {
    title: "",
    description: "",
    latitude: 35.919809,
    longitude: 0,
    images: [],
  };
  const [address, setAddress] = React.useState(null);
  React.useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      initialValues = {
        ...initialValues,
        latitude: crd.latitude,
        longitude: crd.longitude,
      };
      simpleReverseGeocoding(initialValues.latitude, initialValues.longitude)
        .catch(function (error) {
          console.log(error);
          return "";
        })
        .then(function (json) {
          setAddress(json);
          return json.display_name;
        });

      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR[geolocation] (${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
    simpleReverseGeocoding(initialValues.latitude, initialValues.longitude)
      .catch(function (error) {
        console.log(error);
        return "";
      })
      .then(function (json) {
        setAddress(json);
        return json.display_name;
      });
  }, []);

  !user && Router.push("/");
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateListingSchema}
        onSubmit={(values, actions) => {
          CreatListing({
            variables: {
              input: {
                data: {
                  title: values.title,
                  location: {
                    latitude: values.latitude,
                    longitude: values.longitude,
                  },
                  images: values.images.map((img) => img.id),
                  description: values.description,
                },
              },
            },
          }).then((res) => {
            toaster.info(
              intl.formatMessage({
                defaultMessage: "Your listing has been added successfully",
              }),
              {}
            );
            Router.push("/");
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
          setValues,
          setFieldValue,
        }) => {
          return (
            <>
              <BackHomeNavBar />
              <Form onSubmit={handleSubmit}>
                <Grid>
                  <Cell skip={[0, 0, 3]} span={[4, 8, 6]} order={10}>
                    <Button
                      type="submit"
                      size={"large"}
                      isLoading={CreatListingMutationTuplet.loading}
                      overrides={{
                        Root: {
                          style: ({ $theme }) => {
                            return {
                              width: "100%",
                            };
                          },
                        },
                      }}
                    >
                      {intl.formatMessage(buttonMessages.submit)}
                    </Button>
                  </Cell>
                  <Cell span={12}>
                    <Display4 marginBottom="scale500" marginTop="scale500">
                      <FormattedMessage defaultMessage="Create New Listing" />
                    </Display4>
                  </Cell>
                  <Cell span={[4, 8, 6]}>
                    <FormControl
                      label={intl.formatMessage({ defaultMessage: "Title" })}
                      error={() =>
                        errors.title && touched.title && errors.title
                      }
                    >
                      <Input
                        type="text"
                        name="title"
                        disabled={CreatListingMutationTuplet.loading}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        error={errors.title && touched.title}
                      />
                    </FormControl>
                    <FormControl
                      label={intl.formatMessage({
                        defaultMessage: "Description",
                      })}
                      error={() =>
                        errors.description &&
                        touched.description &&
                        errors.description
                      }
                    >
                      <Textarea
                        type="text"
                        name="description"
                        disabled={CreatListingMutationTuplet.loading}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        error={errors.description && touched.description}
                      />
                    </FormControl>
                    <FormControl
                      label={intl.formatMessage({
                        defaultMessage: "Photos",
                      })}
                      error={errors.images && touched.images && errors.images}
                    >
                      <ImagesUploader
                        name="images"
                        images={values.images}
                        errorMessage={errorMessage}
                        maxSize={5242880}
                        onRetry={() => setErrorMessage("")}
                        disabled={CreatListingMutationTuplet.loading}
                        progressMessage={
                          uploadMutationTuplet.loading
                            ? intl.formatMessage({
                                defaultMessage: `Uploading...`,
                              })
                            : ""
                        }
                        onDrop={(acceptedFiles, rejectedFiles) => {
                          if (rejectedFiles && rejectedFiles[0])
                            setErrorMessage(
                              intl.formatMessage({
                                defaultMessage: "Images max size is 5mb",
                              })
                            );
                          uploadFiles({
                            variables: {
                              files: acceptedFiles,
                              path: `listings/${user.id}`,
                            },
                          })
                            .then((value) => {
                              setFieldValue(
                                "images",
                                values.images.concat(value.data.UploadFiles)
                              );
                            })
                            .catch((reason) => console.log(reason));
                        }}
                      />
                    </FormControl>
                  </Cell>
                  <Cell span={[4, 8, 6]}>
                    <FormControl label="Position">
                      <Block height="50vh" width="100%">
                        <Caption2>{address?.display_name || ""}</Caption2>
                        <MapLocationPicker
                          lat={values.latitude}
                          lng={values.longitude}
                          onViewportChange={(lat, lng) => {
                            setValues({
                              ...values,
                              ...{ latitude: lat, longitude: lng },
                            });
                          }}
                          onViewportChanged={(lat, lng) => {
                            simpleReverseGeocoding(lat, lng)
                              .catch(function (error) {
                                console.log(error);
                                return "";
                              })
                              .then(function (json) {
                                setAddress(json);
                                return json.display_name;
                              });
                          }}
                        />
                      </Block>
                    </FormControl>
                  </Cell>
                </Grid>
              </Form>
            </>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default create;
