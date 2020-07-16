import React from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Cell, Grid } from "baseui/layout-grid";
import { Display2, Display4 } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { FileUploader } from "baseui/file-uploader";

interface Props {}

const create = (props: Props) => {
  const [value, setValue] = React.useState("");

  return (
    <React.Fragment>
      <Grid>
        <Cell span={12}></Cell>
        <Cell span={6} skip={3}>
          <Display4>Add your service</Display4>
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
      </Grid>
    </React.Fragment>
  );
};

export default create;
