import React from "react";
import Head from "next/head";
import { StatefulInput } from "baseui/input";
import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppNavBar />
      home page
    </React.Fragment>
  );
};
export default Home;
