import React, { useState, useEffect, useContext, createContext } from "react";
import { useMutation, useQuery } from "react-apollo";
import { loginMutation, registerMutation } from "@graphql/mutations/auth";
import { setAuthToken, fireSignOut } from "@utils/auth";
import client from "@utils/apolloClient";
import { meQuery } from "@graphql/queries/user";
import { Login, LoginVariables } from "@graphql/mutations/gqlTypes/Login";
import {
  SignUpVariables,
  UsersPermissionsLoginPayload,
} from "@graphql/mutations/gqlTypes/Signup";
import { UserMe } from "@graphql/fragments/gqlTypes/User";
import {
  UpdateMePayload,
  UpdateMeVariables,
} from "@graphql/mutations/gqlTypes/User";
import { updateMeMutation } from "@graphql/mutations/user";
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
    const { data, error, loading } = useQuery(meQuery);
    if (data && !loading) {
      error ? signOut() : setUser(data?._me);
    }
    return { data, error, loading };
  };
  const fetchUser = () => useQuery(meQuery);
  const useSignIn = (input: LoginVariables) => {
    const [signIn, { data, error, loading }] = useMutation<
      Login,
      LoginVariables
    >(loginMutation, {
      variables: input,
    });
    !loading && data?.signin?.user && setUser(data?.signin?.user);
    !loading &&
      data?.signin?.jwt &&
      localStorage.setItem("token", data?.signin?.jwt);

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
  const useUpdateUser = (input: SignUpVariables) => {
    const [updateMe, { data, error, loading }] = useMutation<
      UpdateMePayload,
      UpdateMeVariables
    >(updateMeMutation);
    !loading && data && !error && setUser(data?.updateMe.user);
    return [updateMe, { data, error, loading }];
  };
  const signOut = () => {
    console.log("signout");
    fireSignOut(client);
    window.location.reload();
  };
  return {
    user,
    useSignIn,
    getUser,
    setUser,
    signOut,
    useSignUp,
    useUpdateUser,
    fetchUser,
  };
};
export const useAuth = () => {
  return useContext(authContext);
};
