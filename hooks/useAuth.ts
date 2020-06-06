import React, { useState, useEffect, useContext, createContext } from "react";
import { useMutation } from "react-apollo";
import { loginMutation } from "mutations/auth";
import { setAuthToken } from "@utils/auth";
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

  const useSignIn = (input) => {
    const [signIn, { data, error, loading }] = useMutation(loginMutation, {
      variables: input,
    });
    setUser(data?.login?.user);
    setAuthToken(data?.login?.jwt);
    return [signIn, { user, error, loading }];
  };
  return {
    user,
    useSignIn,
  };
};
export const useAuth = () => {
  return useContext(authContext);
};
