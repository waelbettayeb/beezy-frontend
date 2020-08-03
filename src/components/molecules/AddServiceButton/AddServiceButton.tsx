import React from "react";
import { Button, KIND, SHAPE } from "baseui/button";

import useLocale from "@hooks/useLocale";

import { useStyletron } from "baseui";
import { PlusOutlined } from "@ant-design/icons";
import Router from "next/router";
interface Props {}

const AddServiceButton = (props: Props) => {
  const { locale, setLocale } = useLocale();
  const [css, theme] = useStyletron();

  return (
    <React.Fragment>
      <Button
        onClick={() => Router.push("/services/create")}
        kind={KIND.secondary}
        shape={SHAPE.round}
      >
        <PlusOutlined />
      </Button>
    </React.Fragment>
  );
};

export default AddServiceButton;
