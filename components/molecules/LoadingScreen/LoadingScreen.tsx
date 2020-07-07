import React from "react";
import { Grid, Cell, ALIGNMENT, BEHAVIOR } from "baseui/layout-grid";
import { Spinner } from "baseui/spinner";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
interface Props {}

const LoadingScreen = (props: Props) => {
  const [css, theme] = useStyletron();

  return (
    <Block minHeight="100vh" minWidth="100%">
      <Grid behavior={BEHAVIOR.fluid} align={ALIGNMENT.center}>
        <Cell span={12}>
          <Inner h={100}>
            <Spinner />
          </Inner>
        </Cell>
      </Grid>
    </Block>
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
export default LoadingScreen;
