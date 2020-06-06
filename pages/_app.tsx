import { AppProps } from "next/app";

import { ApolloProvider } from "react-apollo";
import client from "@utils/apolloClient";

import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import { styletron, debug } from "../styletron";
import { useProvideAuth, authContext } from "@hooks/useAuth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const auth = useProvideAuth();
  return (
    <ApolloProvider client={client}>
      <authContext.Provider value={auth}>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <BaseProvider theme={LightTheme}>
            <Component {...pageProps} />
          </BaseProvider>
        </StyletronProvider>
      </authContext.Provider>
    </ApolloProvider>
  );
};

export default MyApp;
