import React from "react";
import SignupForm from "@components/molecules/SignupForm";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Block } from "baseui/block";
import Logo from "@components/atoms/Logo";
import { useStyletron } from "baseui";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import LoginForm from "@components/molecules/LoginForm";

interface Props {}

const SignIn = (props: Props) => {
  const [css, theme] = useStyletron();
  const auth = useAuth();
  if (auth.user) Router.push("/");
  return (
    <React.Fragment>
      <Grid align={ALIGNMENT.center}>
        <Cell span={[4, 8, 12]}>
          <Block
            display={"flex"}
            justifyContent={"center"}
            marginTop={theme.sizing.scale800}
            marginBottom={theme.sizing.scale800}
            width={"100%"}
          >
            <Logo onClick={() => Router.push("/")} />
          </Block>
        </Cell>
        <Cell span={[0, 0, 3]}>
          <Block minHeight={"80vh"}></Block>
        </Cell>
        <Cell span={[4, 8, 6]}>
          <LoginForm />
        </Cell>
      </Grid>
    </React.Fragment>
  );
};

export default SignIn;
