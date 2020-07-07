import React, { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { Spinner } from "baseui/spinner";
import { isServer } from "styletron";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { useStyletron } from "baseui";

const Start: React.FC = ({ children }) => {
  const auth = useAuth();

  const { loading } = !isServer && auth.getUser();
  return loading ? (
    <React.Fragment>
      <Grid gridColumns={1} align={ALIGNMENT.center}>
        <Cell>
          <Inner h={100}>
            <Spinner />
          </Inner>
        </Cell>
      </Grid>
    </React.Fragment>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};
const Inner: React.FunctionComponent<{ h: number }> = ({
  children,
  h = 25,
}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: ".25rem",
        height: h + "vh",
      })}
    >
      {children}
    </div>
  );
};
export default Start;
