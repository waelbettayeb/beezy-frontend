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

const MapLocationPicker = dynamic(
  () => import("@components/molecules/MapLocationPicker"),
  {
    ssr: false,
  }
);

const create = () => {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [images, setImages] = React.useState([]);

  const [uploadFiles, { data, error, loading }] = useMutation<
    MultipleUploadPayload,
    MultipleUploadVariables
  >(UploadFilesMutation);
  const { user } = useAuth();
  return (
    <React.Fragment>
      <BackHomeNavBar />
      <Grid>
        <Cell span={12}>
          <Display4 marginBottom="scale500" marginTop="scale500">
            Create New Listing
          </Display4>
        </Cell>
        <Cell span={[4, 8, 6]}>
          <FormControl label="Title">
            <Input
              id="input-id"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl label="Description">
            <Textarea
              id="textarea-id"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
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
    </React.Fragment>
  );
};

export default create;
