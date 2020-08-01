import React from "react";
import { useStyletron } from "baseui";
import { Drawer, ANCHOR, DrawerProps } from "baseui/drawer";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Input } from "baseui/input";
import { Display4, Label3, Label4 } from "baseui/typography";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Label2 } from "baseui/typography";

import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import { Avatar } from "baseui/avatar";
import { ChevronRight } from "baseui/icon";
import { StyledLink } from "baseui/link";
import Divider from "@components/atoms/Divider";
import { ORIENTATION } from "@components/atoms/Divider/Divider";
import { Block } from "baseui/block";

interface Props extends DrawerProps {}

const SearchDrawer = (props: Props) => {
  const [css, theme] = useStyletron();
  const connector = new AppSearchAPIConnector({
    searchKey: "search-v8bawehypykhcvry7p2soobg",
    engineName: "users",
    endpointBase: "http://127.0.0.1:3002",
    cacheResponses: true,
  });
  const config = {
    apiConnector: connector,
  };
  return (
    <Drawer {...props} autoFocus anchor={ANCHOR.left}>
      <SearchProvider config={config}>
        <WithSearch
          mapContextToProps={({
            searchTerm,
            setSearchTerm,
            results,
            setResultsPerPage,
            setCurrent,
          }) => ({
            searchTerm,
            setSearchTerm,
            results,
            setResultsPerPage,
            setCurrent,
          })}
        >
          {({
            searchTerm,
            setSearchTerm,
            results,
            setResultsPerPage,
            setCurrent,
          }) => {
            setResultsPerPage(10);
            setCurrent(1);
            return (
              <Block display="flex" flexDirection="column" height="100%">
                <Display4 marginBottom="scale500">Search</Display4>
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm((e.target as HTMLTextAreaElement).value)
                  }
                />

                <ul
                  className={css({
                    width: "100%",
                    paddingLeft: 0,
                    paddingRight: 0,
                    flex: "1 0 auto",
                  })}
                >
                  {!results.length ? (
                    <Block
                      width="100%"
                      height="100%"
                      display={"flex"}
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Label3 color={theme.colors.contentInverseSecondary}>
                        No data
                      </Label3>
                    </Block>
                  ) : (
                    <div
                      className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                      })}
                    >
                      <Label3>People</Label3>
                      <StyledLink href="#">Show more</StyledLink>
                    </div>
                  )}
                  {results.map((r) => (
                    <ListItem
                      endEnhancer={() => <ChevronRight />}
                      artwork={() => (
                        <Avatar
                          name={`${r.firstname.raw} ${r.lastname.raw}`}
                          size="scale1200"
                        />
                      )}
                      artworkSize={ARTWORK_SIZES.SMALL}
                    >
                      <ListItemLabel description={r.email.raw}>
                        {`${r.firstname.raw} ${r.lastname.raw}`}
                      </ListItemLabel>
                    </ListItem>
                  ))}
                </ul>
              </Block>
            );
          }}
        </WithSearch>
      </SearchProvider>
    </Drawer>
  );
};

export default SearchDrawer;
