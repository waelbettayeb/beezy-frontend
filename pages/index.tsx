import React from "react";
import Head from "next/head";
import { StatefulInput } from "baseui/input";
import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";
import Hero from "@components/molecules/Hero";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Beeezy - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppNavBar />
      <Hero />
    </React.Fragment>
  );
};
export default Home;
