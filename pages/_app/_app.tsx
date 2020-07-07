import { AppProps, Container } from "next/app";

import { ApolloProvider } from "react-apollo";
import client from "@utils/apolloClient";

import { Provider as StyletronProvider } from "styletron-react";

import { styletron, debug } from "../../styletron";
import { useProvideAuth, authContext } from "@hooks/useAuth";
import Start from "./start";
import { ThemeContext, THEME } from "@hooks/useTheme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const auth = useProvideAuth();
  return (
    <ApolloProvider client={client}>
      <authContext.Provider value={auth}>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <ThemeContext.Provider value={THEME.LightTheme}>
            <Start>
              <Component {...pageProps} />
            </Start>
          </ThemeContext.Provider>
        </StyletronProvider>
      </authContext.Provider>
    </ApolloProvider>
  );
};

export default MyApp;
