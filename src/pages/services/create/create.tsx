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

const MapLocationPicker = dynamic(
  () => import("@components/molecules/MapLocationPicker"),
  {
    ssr: false,
  }
);
const CreateListingSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  // phone: Yup.string()
  //   .matches(/^[0-9]{9}$/g, "Invalid phone number")
  //   .required("Required"),
});
const create = () => {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [images, setImages] = React.useState([]);

  const [uploadFiles, { data, error, loading }] = useMutation<
    MultipleUploadPayload,
    MultipleUploadVariables
  >(UploadFilesMutation);
  const { user } = useAuth();
  const initialValues = {
    title: "",
    description: "",
    lat: 0,
    lng: 0,
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateListingSchema}
        onSubmit={(values, actions) => {
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
            <>
              <BackHomeNavBar />
              <Form onSubmit={handleSubmit}>
                <Grid>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        error={errors.description && touched.description}
                      />
                    </FormControl>
                    <FormControl label="Photos">
                      <ImagesUploader
                        images={images}
                        errorMessage={errorMessage}
                        maxSize={5242880}
                        onRetry={() => setErrorMessage("")}
                        progressMessage={loading ? `Uploading...` : ""}
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
                              setImages(images.concat(value.data.UploadFiles));
                              console.log(images);
                            })
                            .catch((reason) => console.log(reason));
                        }}
                      />
                    </FormControl>
                  </Cell>
                  <Cell span={[4, 8, 6]}>
                    <FormControl label="Position">
                      <Block height="50vh" width="100%">
                        <MapLocationPicker />
                      </Block>
                    </FormControl>
                  </Cell>
                  <Cell skip={[0, 0, 3]} span={[4, 8, 6]}>
                    <Button
                      type="submit"
                      size={"large"}
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
