import React, { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { Spinner } from "baseui/spinner";
import { isServer } from "styletron";

const Start: React.FC = ({ children }) => {
  const auth = useAuth();

  const { loading } = !isServer && auth.getUser();
  return loading ? (
    <React.Fragment>
      <Spinner />
    </React.Fragment>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default Start;
