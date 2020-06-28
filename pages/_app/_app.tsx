import { AppProps, Container } from "next/app";

import { ApolloProvider } from "react-apollo";
import client from "@utils/apolloClient";

import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import { styletron, debug } from "../../styletron";
import { useProvideAuth, authContext } from "@hooks/useAuth";
import Start from "./start";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const auth = useProvideAuth();
  return (
    <ApolloProvider client={client}>
      <authContext.Provider value={auth}>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <BaseProvider theme={LightTheme}>
            <Start>
              <Component {...pageProps} />
            </Start>
          </BaseProvider>
        </StyletronProvider>
      </authContext.Provider>
    </ApolloProvider>
  );
};

export default MyApp;
