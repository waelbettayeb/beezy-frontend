import React, { useState } from "react";

import SearchNavBar from "@components/molecules/SearchNavBar/SearchNavBar";
import { useStyletron } from "baseui";
import ListingsSearchTile from "@components/molecules/ListingsSearchTile";
import { Cell, Grid } from "baseui/layout-grid";
import { Block } from "baseui/block";
import { Tabs, Tab } from "baseui/tabs";

import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";
import Router from "next/router";
import { Avatar } from "baseui/avatar";
import {
  Caption1,
  HeadingXSmall,
  LabelLarge,
  LabelMedium,
  Paragraph1,
  ParagraphXSmall,
} from "baseui/typography";
import Divider from "@components/atoms/Divider";
import { ORIENTATION } from "@components/atoms/Divider/Divider";
import Footer from "@components/organisms/Footer";
import Link from "next/link";

const Profile = () => {
  const [css, theme] = useStyletron();
  const { id } = Router.query;

  return (
    <>
      <Block
        height="100vh"
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <AppNavBar />
      </Block>
      <Footer />
    </>
  );
};

export default Profile;
