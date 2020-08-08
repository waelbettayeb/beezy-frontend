import React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";

import { Button, KIND } from "baseui/button";
import Router from "next/router";
import { ChevronLeft, Search } from "baseui/icon";
import Logo from "src/components/atoms/Logo";

import { Theme } from "baseui/theme";
import { Block } from "baseui/block";
import { ALIGNMENT, Cell, Grid } from "baseui/layout-grid";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";

interface Props {
  searchTerm?: string;
  onSearchTermChange?: (e: any) => void;
}

const SearchNavBar = (props: Props) => {
  const { searchTerm, onSearchTermChange } = props;
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
          <Cell span={[2, 1, 1]}>
            <Block
              width="100%"
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Logo />
            </Block>
          </Cell>
          <Cell span={[4, 4, 6]}>
            <Input
              type="search"
              placeholder="Search..."
              startEnhancer={<Search size="18px" />}
              value={searchTerm}
              clearable
              onChange={onSearchTermChange}
            />
          </Cell>
        </Grid>
      </Block>
    </HeaderNavigation>
  );
};

export default SearchNavBar;
