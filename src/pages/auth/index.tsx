import React from "react";

interface Props {}
import Router from "next/router";
import { setAuthToken } from "@utils/auth";
import LoadingScreen from "@components/molecules/LoadingScreen";

const AuthCallbackPage = (props: Props) => {
  const { access_token } = Router.query;
  setAuthToken(access_token as string);
  Router.push("/");
  return <LoadingScreen />;
};

export default AuthCallbackPage;
