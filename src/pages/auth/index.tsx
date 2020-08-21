import React from "react";

interface Props {}
import Router from "next/router";
import { setAuthToken } from "@utils/auth";
import LoadingScreen from "@components/molecules/LoadingScreen";
import { useAuth } from "@hooks/useAuth";

const AuthCallbackPage = (props: Props) => {
  const { access_token } = Router.query;
  setAuthToken(access_token as string);
  const auth = useAuth();
  const { loading } = auth.getUser();
  !loading && Router.push("/");
  return <LoadingScreen />;
};

export default AuthCallbackPage;
