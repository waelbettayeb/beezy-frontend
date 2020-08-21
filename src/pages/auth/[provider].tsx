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
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        setAuthToken(res.jwt as string, () => {
          const { loading } = auth.getUser();
          // !loading && Router.push("/");
        });
        console.log("username", res.user);
        setText(
          "You have been successfully logged in. You will be redirected in a few seconds..."
        );
        setTimeout(() => Router.push("/"), 3000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
        setText("An error occured, please see the developper console.");
      });
  }, [provider]);
  return <ParagraphLarge>{text}</ParagraphLarge>;
};

export default AuthCallbackPage;
