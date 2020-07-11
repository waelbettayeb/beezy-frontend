import { AppProps, Container } from "next/app";

import { ApolloProvider } from "react-apollo";
import client from "src/utils/apolloClient";

import { Provider as StyletronProvider } from "styletron-react";

import { styletron, debug } from "../../../styletron";
import { useProvideAuth, authContext } from "src/hooks/useAuth";
import Start from "./start";
import { ThemeProvider } from "src/hooks/Theme";
import BaseUIProvider from "./BaseUIProvider";
import { LocaleProvider } from "@components/providers/Locale";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const auth = useProvideAuth();
  return (
    <ApolloProvider client={client}>
      <authContext.Provider value={auth}>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <LocaleProvider>
            <ThemeProvider>
              <BaseUIProvider>
                <Start>
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
