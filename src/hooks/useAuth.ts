import React, { useState, useEffect, useContext, createContext } from "react";
import { useMutation, useQuery } from "react-apollo";
import { loginMutation } from "src/mutations/auth";
import { setAuthToken, fireSignOut } from "src/utils/auth";
import client from "src/utils/apolloClient";
import { userQuery } from "src/queries/user";
import { LoginVariables } from "src/mutations/gqlTypes/Login";
declare global {
  interface Window {
    PasswordCredential: any;
    Cypress?: any;
    FederatedCredential: any;
  }
}

export const authContext = createContext(null);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const getUser = () => {
    const { data, error, loading } = useQuery(userQuery);
    if (data && !loading) {
      error ? signOut() : setUser(data?.me);
    }
    return { user, loading };
  };
  const useSignIn = (input: LoginVariables) => {
    const [signIn, { data, error, loading }] = useMutation<any, LoginVariables>(
      loginMutation,
      {
        variables: input,
      }
    );
    setUser(data?.login?.user);
    setAuthToken(data?.login?.jwt);
    return [signIn, { user, error, loading }];
  };
  const signOut = () => {
    setUser(null);
    fireSignOut(client);
  };
  return {
    user,
    useSignIn,
    getUser,
    signOut,
  };
};
export const useAuth = () => {
  return useContext(authContext);
};
