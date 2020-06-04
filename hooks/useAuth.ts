import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

export const authContext = createContext(null);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const cleanErrors = () => setErrors(null);
  const signin = (identifier, password) => {
    setLoading(true);
    setErrors(null);
    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URI}/auth/local`, {
        identifier,
        password,
      })
      .then((response) => {
        // Handle success.
        setErrors(null);
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error.
        setLoading(false);
        console.log(
          "An error occurred:",
          error.response.data.message[0].messages
        );
        setErrors(error.response.data.message[0].messages);
      });
  };
  return {
    user,
    signin,
    loading,
    errors,
    cleanErrors,
  };
};
export const useAuth = () => {
  return useContext(authContext);
};
