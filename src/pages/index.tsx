import React from "react";
import Head from "next/head";
import { StatefulInput } from "baseui/input";
import AppNavBar from "src/components/molecules/AppNavBar/AppNavBar";
import Hero from "src/components/molecules/Hero";
import Footer from "@components/organisms/Footer";
import { useAuth } from "@hooks/useAuth";
import { FormattedMessage } from "react-intl";

const Home: React.FC = () => {
  const auth = useAuth();
  auth.getUser();
  return (
    <React.Fragment>
      <AppNavBar />
      <Hero />
      <Footer />
    </React.Fragment>
  );
};
export default Home;
