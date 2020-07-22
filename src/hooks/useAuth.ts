import React, { useState, useEffect, useContext, createContext } from "react";
import { useMutation, useQuery } from "react-apollo";
import { loginMutation, registerMutation } from "src/mutations/auth";
import { setAuthToken, fireSignOut } from "src/utils/auth";
import client from "src/utils/apolloClient";
import { userQuery } from "src/queries/user";
import { Login, LoginVariables } from "src/mutations/gqlTypes/Login";
import {
  SignUpVariables,
  UsersPermissionsLoginPayload,
} from "src/mutations/gqlTypes/Signup";
import { UserMe } from "src/fragments/gqlTypes/User";
declare global {
  interface Window {
    PasswordCredential: any;
    Cypress?: any;
    FederatedCredential: any;
  }
}

export const authContext = createContext(null);

export const useProvideAuth = () => {
  const [user, setUser] = useState<UserMe>(null);

  const getUser = () => {
    const { data, error, loading } = useQuery(userQuery);
    if (data && !loading) {
      error ? signOut() : setUser(data?._me);
    }
    return { user, loading };
  };
  const useSignIn = (input: LoginVariables) => {
    const [signIn, { data, error, loading }] = useMutation<
      Login,
      LoginVariables
    >(loginMutation, {
      variables: input,
    });
    setUser(data?.signin?.user);
    setAuthToken(data?.signin?.jwt);
    return [signIn, { user, error, loading }];
  };
  const useSignUp = (input: SignUpVariables) => {
    const [signUp, { data, error, loading }] = useMutation<
      UsersPermissionsLoginPayload,
      SignUpVariables
    >(registerMutation, {
      variables: input,
    });
    setUser(data?.signup.user);
    setAuthToken(data?.signup.jwt);
    return [signUp, { user, error, loading }];
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
    useSignUp,
  };
};
export const useAuth = () => {
  return useContext(authContext);
};
