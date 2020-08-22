import React from "react";

interface Props {}
import Router from "next/router";
import { setAuthToken } from "@utils/auth";
import LoadingScreen from "@components/molecules/LoadingScreen";
import { useAuth } from "@hooks/useAuth";
import { ParagraphLarge } from "baseui/typography";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import { toaster } from "baseui/toast";

const AuthCallbackPage = (props: Props) => {
  const { access_token, provider } = Router.query;

  const [text, setText] = React.useState("Loading...");
  const [loading, setSetloading] = React.useState(true);
  const [token, setToken] = React.useState(null);
  const auth = useAuth();

  if (token) {
    localStorage.setItem("token", token);
    auth.getUser();
    Router.push("/");
    toaster.info("You are successfully logged in", {});
  }

  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/${provider}/callback?access_token=${access_token}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Beeesy. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        setToken(res.jwt);
      })
      .catch((err) => {
        setSetloading(false);
        console.log(err);
        setText("An error occured.");
      });
  }, [provider]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <BackHomeNavBar />
          <ParagraphLarge>{text}</ParagraphLarge>
        </>
      )}
    </>
  );
};

export default AuthCallbackPage;
