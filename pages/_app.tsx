import { AppProps } from 'next/app'

import { ApolloProvider } from 'react-apollo'
import client from '@utils/apolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp