import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";

import { Button, KIND } from "baseui/button";
import Router from "next/router";
import { ChevronLeft } from "baseui/icon";
import Logo from "src/components/atoms/Logo";

import { Theme } from "baseui/theme";
import { Block } from "baseui/block";
import { ALIGNMENT, Cell, Grid } from "baseui/layout-grid";
import { useStyletron } from "baseui";
import { FormattedMessage } from "react-intl";

interface Props {}

const BackHomeNavBar = (props: Props) => {
  const [css, theme] = useStyletron();
  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => {
            const theme: Theme = $theme;
            return {
              padding: theme.sizing.scale300,
            };
          },
        },
      }}
    >
      <Block width="100%">
        <Grid align={ALIGNMENT.center}>
          <Cell span={[1, 0]}>
            <Button
              onClick={() => Router.push("/")}
              kind={KIND.tertiary}
              startEnhancer={() => <ChevronLeft size={24} />}
            ></Button>
          </Cell>
          <Cell span={[0, 3, 4]}>
            <Button
              onClick={() => Router.push("/")}
              kind={KIND.tertiary}
              startEnhancer={() => <ChevronLeft size={24} />}
            >
              <FormattedMessage defaultMessage="Back to home" />
            </Button>
          </Cell>
          <Cell span={[2, 2, 4]}>
            <Block
              width="100%"
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Logo onClick={() => Router.push("/")} />
            </Block>
          </Cell>
        </Grid>
      </Block>
    </HeaderNavigation>
  );
};

export default BackHomeNavBar;
