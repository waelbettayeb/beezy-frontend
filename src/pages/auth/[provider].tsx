import React from "react";

interface Props {}
import Router from "next/router";
import { setAuthToken } from "@utils/auth";
import LoadingScreen from "@components/molecules/LoadingScreen";
import { useAuth } from "@hooks/useAuth";
import { ParagraphLarge } from "baseui/typography";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import { toaster } from "baseui/toast";
import { useIntl } from "react-intl";

const AuthCallbackPage = (props: Props) => {
  const [text, setText] = React.useState("Loading...");
  const { access_token, provider } = Router.query;
  const [loading, setSetloading] = React.useState(true);
  const intl = useIntl();
  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/${provider}/callback?access_token=${access_token}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(
            intl.formatMessage(
              {
                defaultMessage: `Couldn't login to Beeesy. Status: {status}`,
              },
              {
                status: res.status,
              }
            )
          );
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.jwt);
        Router.push("/");
        toaster.info(
          intl.formatMessage({
            defaultMessage: "You are successfully logged in",
          }),
          {}
        );
      })
      .catch((err) => {
        setSetloading(false);
        console.log(err);
        setText(
          intl.formatMessage({
            defaultMessage: "An error occurred.",
          })
        );
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
