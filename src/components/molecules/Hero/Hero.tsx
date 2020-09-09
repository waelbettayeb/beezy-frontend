import React, { ReactElement } from "react";
import { Grid, Cell, ALIGNMENT } from "baseui/layout-grid";
import { Paragraph1, DisplaySmall, ParagraphMedium } from "baseui/typography";
import { useStyletron } from "baseui";
import { Search } from "baseui/icon";
import { Input, SIZE } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Block } from "baseui/block";
import { FormattedMessage, useIntl } from "react-intl";
import SearchDrawer from "@components/organisms/SearchDrawer";
import Router from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { StatefulPopover } from "baseui/popover";

interface Props {}

function Hero({}: Props): ReactElement {
  const intl = useIntl();
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
        <Inner h={75}>
          {/* <Label1>{"About us"}</Label1> */}

          <DisplaySmall
            $style={{
              textAlign: "center",
            }}
          >
            <FormattedMessage defaultMessage={`We ignite bee hives`} />
            <br />
            <FormattedMessage defaultMessage={`by companying beekeepers.`} />
          </DisplaySmall>
          <ParagraphMedium
            $style={{
              textAlign: "center",
            }}
          >
            <FormattedMessage
              defaultMessage={
                "Good things happen when people can connect, find the right place where your hives can produce more."
              }
            />
          </ParagraphMedium>
          <Input
            type="search"
            startEnhancer={<Search size="18px" />}
            size={SIZE.large}
            placeholder={intl.formatMessage({ defaultMessage: "Search..." })}
            onKeyDown={() => setIsOpen(true)}
          />
          <SearchDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <br />
          <img
            src={"/hero-illustration.svg"}
            alt="Beeesy Logo"
            className={css({
              height: "30vh",
              maxWidth: "80vw",
            })}
          />
          {/* <StyledLink href="#">
            <FormattedMessage defaultMessage={"Learn more about beekeeping"} />
          </StyledLink> */}
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
        minHeight: h + "vh",
        maxHeight: "700px",
      })}
    >
      {children}
    </div>
  );
};
export default Hero;
