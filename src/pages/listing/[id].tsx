import React from "react";
import { useStyletron } from "baseui";

import { Block } from "baseui/block";

import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";
import Router from "next/router";

import Footer from "@components/organisms/Footer";
import ListingPresentation from "@components/molecules/ListingPresentation";

const Profile = () => {
  const [css, theme] = useStyletron();
  const { id } = Router.query;

  // !loading && !data?.user && Router.push("/404");

  return (
    <>
      <Block
        minHeight="100vh"
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <AppNavBar />
        <Block
          minHeight="90vh"
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
        >
          <ListingPresentation id={id as string} />
        </Block>
        <Footer />
      </Block>
    </>
  );
};

export default Profile;
