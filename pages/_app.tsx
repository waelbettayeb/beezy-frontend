import { AppProps } from "next/app";

import { ApolloProvider } from "react-apollo";
import client from "@utils/apolloClient";

import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import { styletron, debug } from "../styletron";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={LightTheme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    </ApolloProvider>
  );
};

export default MyApp;
