import React from "react";
import { useAuth } from "@hooks/useAuth";
import { Spinner } from "baseui/spinner";

const Start: React.FC = ({ children }) => {
  const auth = useAuth();
  const { loading } = auth.getUser();
  return loading ? (
    <React.Fragment>
      <Spinner />
    </React.Fragment>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default Start;
