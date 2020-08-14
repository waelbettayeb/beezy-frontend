import React from "react";
import SignupForm from "@components/molecules/SignupForm";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";
import EditProfileForm from "@components/molecules/EditProfileForm";

interface Props {}

const Settings = (props: Props) => {
  const [css, theme] = useStyletron();
  const auth = useAuth();
  const { data, error, loading } = auth.fetchUser();
  const user = auth.user;
  !loading && !data && Router.push("/auth/signin");
  return (
    <React.Fragment>
      <AppNavBar />
      <Grid align={ALIGNMENT.center}>
        <Cell span={[0, 0, 3]}>
          <Block minHeight={"80vh"}></Block>
        </Cell>
        {data?._me && user && (
          <Cell span={[4, 8, 6]}>
            <EditProfileForm user={user} />
          </Cell>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Settings;
