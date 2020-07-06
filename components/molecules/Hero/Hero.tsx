import React, { ReactElement } from "react";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Label1, Display2, Paragraph1, Display4 } from "baseui/typography";
import { useStyletron } from "baseui";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Block } from "baseui/block";

interface Props {}

function Hero({}: Props): ReactElement {
  const textString = "We ignite bee hives by companying beekeepers.";
  const bodyString =
    "Good things happen when people can connect, find the right bee yard when your hives can produce more. ";
  function After() {
    const [css, theme] = useStyletron();
    return (
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          paddingRight: theme.sizing.scale500,
        })}
      >
        <Search size="18px" />
      </div>
    );
  }
  return (
    <Grid
      align={ALIGNMENT.center}
      gridUnit="rem"
      gridGutters={[1, 2, 8]}
      gridMargins={[1, 4, 6]}
    >
      <Cell span={[4, 4, 6]}>
        <Block paddingTop={"5vh"} paddingBottom={"5vh"}>
          <Label1>{"Service"}</Label1>
          <Display2>{textString}</Display2>
          <Paragraph1>{bodyString}</Paragraph1>
          <Input overrides={{ After }} placeholder="Search a bee yard..." />
          <br />
          <StyledLink href="#">Learn more about beekeeping</StyledLink>
        </Block>
      </Cell>
      <Cell span={[0, 4, 6]}>
        <Inner h={80}> </Inner>
      </Cell>
    </Grid>
  );
}
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
        background: theme.colors.accent200,
        color: theme.colors.accent700,
        padding: ".25rem",
        height: h + "vh",
        maxHeight: "700px",
      })}
    >
      {children}
    </div>
  );
};
export default Hero;
