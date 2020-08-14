import React, { useState } from "react";
import { useStyletron } from "baseui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Label3 } from "baseui/typography";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";

import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import { Avatar } from "baseui/avatar";
import { ChevronRight } from "baseui/icon";
import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import Router from "next/router";

interface Props {
  searchedTerm: string;
}

const ProfilesSearchTile = (props: Props) => {
  const [css, theme] = useStyletron();
  const connector = new AppSearchAPIConnector({
    searchKey: "search-v8bawehypykhcvry7p2soobg",
    engineName: "users",
    endpointBase: "http://127.0.0.1:3002",
    cacheResponses: true,
  });
  const config = {
    apiConnector: connector,
    trackUrlState: false,
  };
  return (
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
          setSearchTerm(props.searchedTerm);
          setResultsPerPage(3);
          setCurrent(1);
          return (
            <ul
              className={css({
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
              })}
            >
              {!results.length ? (
                <Block
                  width="100%"
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
                <div
                  onClick={() =>
                    Router.push(
                      "/profile/[pid]",
                      `/profile/${r.id.raw.substring(6)}`
                    )
                  }
                >
                  <ListItem
                    endEnhancer={() => <ChevronRight />}
                    artwork={() => (
                      <Avatar
                        src={r.avatar?.url?.raw}
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
                </div>
              ))}
            </ul>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
};

export default ProfilesSearchTile;
