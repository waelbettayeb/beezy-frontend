import React from "react";
import Head from "next/head";
import { StatefulInput } from "baseui/input";
import AppNavBar from "src/components/molecules/AppNavBar/AppNavBar";
import Hero from "src/components/molecules/Hero";
import Footer from "@components/organisms/Footer";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Beeesy - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppNavBar />
      <Hero />
      <Footer />
    </React.Fragment>
  );
};
export default Home;
