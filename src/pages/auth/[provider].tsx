import React from "react";

interface Props {}
import Router from "next/router";
import { setAuthToken } from "@utils/auth";
import LoadingScreen from "@components/molecules/LoadingScreen";
import { useAuth } from "@hooks/useAuth";
import { ParagraphLarge } from "baseui/typography";

const AuthCallbackPage = (props: Props) => {
  const [text, setText] = React.useState("Loading...");
  const { access_token, provider } = Router.query;
  const auth = useAuth();

  React.useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/${provider}/callback?access_token=${access_token}`
    )
      .then((res) => res.json())
      .then((res) => {
        setAuthToken(res.jwt as string, () => {
          auth.getUser();
          const { data, error, loading } = auth.fetchUser();
          Router.push("/");
        });
      })
      .catch((err) => {
        console.log(err);
        setText("An error occured.");
      });
  }, [provider]);
  return <ParagraphLarge>{text}</ParagraphLarge>;
};

export default AuthCallbackPage;
