import React, { ReactElement } from "react";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Paragraph1, DisplaySmall } from "baseui/typography";
import { useStyletron } from "baseui";
import { Search } from "baseui/icon";
import { Input, SIZE } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Block } from "baseui/block";
import { FormattedMessage } from "react-intl";
import SearchDrawer from "@components/organisms/SearchDrawer";

interface Props {}

function Hero({}: Props): ReactElement {
  const textString = "We ignite bee hives by companying beekeepers.";
  const bodyString =
    "Good things happen when people can connect, find the right place where your hives can produce more. ";
  const [isOpen, setIsOpen] = React.useState(false);
  const [css, _theme] = useStyletron();

  return (
    <Grid
      align={ALIGNMENT.center}
      gridUnit="rem"
      gridGutters={[1, 2, 8]}
      gridMargins={[1, 4, 6]}
    >
      <Cell span={[4, 4, 6]}>
        <Block paddingTop={"5vh"} paddingBottom={"5vh"}>
          {/* <Label1>{"About us"}</Label1> */}
          <DisplaySmall>{textString}</DisplaySmall>
          <Paragraph1>{bodyString}</Paragraph1>
          <Input
            type="search"
            startEnhancer={<Search size="18px" />}
            size={SIZE.large}
            placeholder="Search for a person, a bee yard..."
            onKeyDown={() => setIsOpen(true)}
          />
          <br />
          <SearchDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <StyledLink href="#">
            <FormattedMessage defaultMessage={"Learn more about beekeeping"} />
          </StyledLink>
        </Block>
      </Cell>
      <Cell span={[0, 4, 6]}>
        <Inner h={80}>
          <img
            src={"/hero-illustration.svg"}
            alt="Beeesy Logo"
            className={css({
              width: "100%",
            })}
          />
        </Inner>
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
