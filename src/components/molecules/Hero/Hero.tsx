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
import Router from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { StatefulPopover } from "baseui/popover";

interface Props {}

function Hero({}: Props): ReactElement {
  const textString = "We ignite bee hives by companying beekeepers.";
  const bodyString =
    "Good things happen when people can connect, find the right place where your hives can produce more. ";
  const [isOpen, setIsOpen] = React.useState(false);
  const [css, _theme] = useStyletron();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
      setSearchTerm(value as string);
      value && Router.push(`/marketplace?q=${value}`);
    },
    // delay in ms
    1000
  );

  return (
    <Grid
      align={ALIGNMENT.center}
      gridUnit="rem"
      gridGutters={[1, 2, 8]}
      gridMargins={[1, 4, 6]}
    >
      <Cell span={[4, 8, 12]}>
        <Inner h={80}>
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
          <SearchDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <br />
          <StyledLink href="#">
            <FormattedMessage defaultMessage={"Learn more about beekeeping"} />
          </StyledLink>
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
        flexDirection: "column",
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
