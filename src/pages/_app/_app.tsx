import { AppProps, Container } from "next/app";

import { ApolloProvider } from "react-apollo";
import client from "src/utils/apolloClient";

import { Provider as StyletronProvider } from "styletron-react";

import { styletron, debug } from "../../../styletron";
import { useProvideAuth, authContext } from "src/hooks/useAuth";
import Start from "./start";
import { ThemeProvider } from "src/hooks/Theme";
import BaseUIProvider from "./BaseUIProvider";
import { LocaleProvider } from "@components/containers/Locale";
import JavascriptTimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ar from "javascript-time-ago/locale/ar";
import fr from "javascript-time-ago/locale/fr";
import Head from "next/head";
import React from "react";

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ar);
JavascriptTimeAgo.addLocale(fr);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const auth = useProvideAuth();
  React.useEffect(() => {
    var d = window.document;
    var t = "script";

    var BASE_URL = "https://app.chatwoot.com";
    var g = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    (g as any).src = BASE_URL + "/packs/js/sdk.js";
    s.parentNode.insertBefore(g, s);
    g.onload = function () {
      (window as any).chatwootSDK.run({
        websiteToken: "AYU42TCn91SQAJsobazhgfAr",
        baseUrl: BASE_URL,
      });
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <authContext.Provider value={auth}>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <LocaleProvider>
            <ThemeProvider>
              <BaseUIProvider>
                <Start>
                  <Head>
                    <title>Beeesy</title>
                    <link rel="icon" href="/favicon.ico" />
                  </Head>
                  <Component {...pageProps} />
                </Start>
              </BaseUIProvider>
            </ThemeProvider>
          </LocaleProvider>
        </StyletronProvider>
      </authContext.Provider>
    </ApolloProvider>
  );
};

export default MyApp;
