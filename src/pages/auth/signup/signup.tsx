import React from "react";
import SignupForm from "@components/molecules/SignupForm";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Block } from "baseui/block";
import Logo from "@components/atoms/Logo";
import { useStyletron } from "baseui";

interface Props {}

const Signup = (props: Props) => {
  const [css, theme] = useStyletron();
  return (
    <React.Fragment>
      <Grid align={ALIGNMENT.center}>
        <Cell span={[4, 8, 0]}>
          <Block
            display={"flex"}
            justifyContent={"center"}
            marginTop={theme.sizing.scale800}
            marginBottom={theme.sizing.scale800}
            width={"100%"}
          >
            <Logo />
          </Block>
        </Cell>
        <Cell span={[0, 0, 6]}>
          <Block minHeight={"100vh"}></Block>
        </Cell>
        <Cell span={[4, 8, 6]}>
          <SignupForm />
        </Cell>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
