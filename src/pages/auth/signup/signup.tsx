import React from "react";
import SignupForm from "@components/molecules/SignupForm";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";

interface Props {}

const Signup = (props: Props) => {
  const [css, theme] = useStyletron();
  const auth = useAuth();
  if (auth.user) Router.push("/");
  return (
    <React.Fragment>
      <BackHomeNavBar />
      <Grid align={ALIGNMENT.center}>
        <Cell span={[0, 0, 3]}>
          <Block minHeight={"80vh"}></Block>
        </Cell>
        <Cell span={[4, 8, 6]}>
          <SignupForm />
        </Cell>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
