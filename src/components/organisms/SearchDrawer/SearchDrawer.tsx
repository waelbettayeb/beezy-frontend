import React, { useState } from "react";
import { useStyletron } from "baseui";
import { Drawer, ANCHOR, DrawerProps } from "baseui/drawer";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Input } from "baseui/input";
import { Display4, Label3, Label4 } from "baseui/typography";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Label2 } from "baseui/typography";

import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import { Avatar } from "baseui/avatar";
import { ChevronRight } from "baseui/icon";
import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import ProfilesSearchTile from "./ProfilesSearchTile";
import ListingsSearchTile from "./ListingsSearchTile";

interface Props extends DrawerProps {}

const SearchDrawer = (props: Props) => {
  const [css, theme] = useStyletron();
  const [searchedTerm, setSearchedTerm] = useState("");

  return (
    <Drawer {...props} autoFocus anchor={ANCHOR.left}>
      <Block display="flex" flexDirection="column" height="100%">
        <Display4 marginBottom="scale500">Search</Display4>
        <Input
          type="search"
          placeholder="Search..."
          value={searchedTerm}
          onChange={(e) =>
            setSearchedTerm((e.target as HTMLTextAreaElement).value)
          }
        />
        <ProfilesSearchTile searchedTerm={searchedTerm} />
        <ListingsSearchTile searchedTerm={searchedTerm} />
      </Block>
    </Drawer>
  );
};

export default SearchDrawer;
