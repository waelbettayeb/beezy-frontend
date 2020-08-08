import React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Cell, Grid } from "baseui/layout-grid";
import { Display4 } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import dynamic from "next/dynamic";
import { Block } from "baseui/block";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import { Button } from "baseui/button";
import { useMutation } from "@apollo/react-hooks";
import {
  MultipleUploadPayload,
  MultipleUploadVariables,
} from "src/mutations/gqlTypes/Upload";
import { UploadFilesMutation } from "src/mutations/upload";
import { useAuth } from "@hooks/useAuth";

import ImagesUploader from "@components/molecules/ImagesUploader/ImagesUploader";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CreateListingPayload,
  CreateListingVariables,
} from "src/mutations/gqlTypes/Listing";
import { CreateListingMutation } from "src/mutations/listing";

const MapLocationPicker = dynamic(
  () => import("@components/molecules/MapLocationPicker"),
  {
    ssr: false,
  }
);
const CreateListingSchema = Yup.object().shape({
  title: Yup.string()
    .max(25, "max number of characters is 25")
    .required("Required"),
  description: Yup.string().required("Required"),
  latitude: Yup.number().required("Required"),
  longitude: Yup.number().required("Required"),
  images: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().required(),
        id: Yup.string().required(),
      })
    )
    .min(1, "Required"),
  // phone: Yup.string()
  //   .matches(/^[0-9]{9}$/g, "Invalid phone number")
  //   .required("Required"),
});
const create = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [images, setImages] = React.useState([]);

  const [CreatListing, CreatListingMutationTuplet] = useMutation<
    CreateListingPayload,
    CreateListingVariables
  >(CreateListingMutation);
  const [uploadFiles, uploadMutationTuplet] = useMutation<
    MultipleUploadPayload,
    MultipleUploadVariables
  >(UploadFilesMutation);
  const { user } = useAuth();
  const initialValues = {
    title: "",
    description: "",
    latitude: 35.919809,
    longitude: 0,
    images: [],
  };
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
                      Submit
                    </Button>
                  </Cell>
                  <Cell span={12}>
                    <Display4 marginBottom="scale500" marginTop="scale500">
                      Create New Listing
                    </Display4>
                  </Cell>
                  <Cell span={[4, 8, 6]}>
                    <FormControl
                      label="Title"
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
                      label="Description"
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
                      label="Photos"
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
                          uploadMutationTuplet.loading ? `Uploading...` : ""
                        }
                        onDrop={(acceptedFiles, rejectedFiles) => {
                          if (rejectedFiles && rejectedFiles[0])
                            setErrorMessage("Images max size is 5mb");
                          uploadFiles({
                            variables: {
                              files: acceptedFiles,
                              path: `listings/${user.id}`,
                            },
                          })
                            .then((value) => {
                              setFieldValue(
                                "images",
                                images.concat(value.data.UploadFiles)
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
                        <MapLocationPicker
                          lat={values.latitude}
                          lng={values.longitude}
                          onViewportChange={(lat, lng) => {
                            setValues({
                              ...values,
                              ...{ latitude: lat, longitude: lng },
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
