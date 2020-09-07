import React from "react";
import Head from "next/head";
import { StatefulInput } from "baseui/input";
import AppNavBar from "src/components/molecules/AppNavBar/AppNavBar";
import Hero from "src/components/molecules/Hero";
import Footer from "@components/organisms/Footer";
import { useAuth } from "@hooks/useAuth";
import { FormattedMessage } from "react-intl";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { DisplayMedium, DisplaySmall } from "baseui/typography";
import { Grid, Cell } from "baseui/layout-grid";

const Home: React.FC = () => {
  const auth = useAuth();
  auth.getUser();
  const [css, theme] = useStyletron();
  return (
    <React.Fragment>
      <AppNavBar />
      <Hero />
      {/* <Grid>
        <Cell>
          <Block
            backgroundColor={theme.colors.backgroundSecondary}
            flexDirection={"column"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <DisplaySmall>Latest listings</DisplaySmall>
          </Block>
        </Cell>
      </Grid> */}
      <Footer />
    </React.Fragment>
  );
};
export default Home;
