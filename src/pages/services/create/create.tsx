import React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Cell, Grid } from "baseui/layout-grid";
import { Display4 } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { FileUploader } from "baseui/file-uploader";
import dynamic from "next/dynamic";
import { Block } from "baseui/block";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import { Button } from "baseui/button";

const MapLocationPicker = dynamic(
  () => import("@components/molecules/MapLocationPicker"),
  {
    ssr: false,
  }
);

interface Props {}

const create = (props: Props) => {
  const [value, setValue] = React.useState("");

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
          <FormControl label="Photos">
            <FileUploader accept={"image/png"} multiple />
          </FormControl>
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
