import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { getAuthToken } from "./auth";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
const link = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_URI}/graphql`,
});

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URI}/graphql`,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
});

export default client;
