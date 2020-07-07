import React, { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { Spinner } from "baseui/spinner";
import { isServer } from "styletron";
import { Grid, Cell, ALIGNMENT, BEHAVIOR } from "baseui/layout-grid";
import { useStyletron } from "baseui";

const Start: React.FC = ({ children }) => {
  const auth = useAuth();
  const { loading } = !isServer && auth.getUser();

  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
        minWidth: "100%",
      })}
    >
      {loading ? (
        <React.Fragment>
          <Grid behavior={BEHAVIOR.fluid} align={ALIGNMENT.center}>
            <Cell span={12}>
              <Inner h={100}>
                <Spinner />
              </Inner>
            </Cell>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </div>
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
        width: "100%",
      })}
    >
      {children}
    </div>
  );
};
export default Start;
