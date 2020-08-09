import React, { useState } from "react";
import { useStyletron } from "baseui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  Caption1,
  Label3,
  LabelSmall,
  LabelXSmall,
  Paragraph1,
  Paragraph4,
} from "baseui/typography";

import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import { Cell, Grid } from "baseui/layout-grid";

interface Props {
  resultsPerPage?: number;
  searchedTerm: string;
  onSearchEnd?: (result) => void;
  lat: number;
  lon: number;
  distance: number;
}

const ListingsSearchTile = (props: Props) => {
  const { resultsPerPage, onSearchEnd, lat, lon, distance } = props;
  const [css, theme] = useStyletron();
  const connector = new AppSearchAPIConnector({
    searchKey: "search-v8bawehypykhcvry7p2soobg",
    engineName: "listings",
    endpointBase: "http://127.0.0.1:3002",
    cacheResponses: true,
  });
  const config = {
    apiConnector: connector,
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
          setFilter,
        }) => ({
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          setCurrent,
          setFilter,
        })}
      >
        {({
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          setCurrent,
          setFilter,
        }) => {
          setSearchTerm(props.searchedTerm);
          setResultsPerPage(resultsPerPage || 10);
          setCurrent(1);
          onSearchEnd(results);
          setFilter(
            "location",
            {
              distance,
              unit: "km",
              center: `${lat},${lon}`,
            },
            null
          );
          return (
            <div
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
                  marginTop={theme.sizing.scale600}
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
                    marginBottom: theme.sizing.scale400,
                  })}
                >
                  <Label3>Business</Label3>
                  <StyledLink href="#">Show more</StyledLink>
                </div>
              )}
              <Grid gridMargins={10} gridGaps={10} gridGutters={10}>
                {results.map((r) => (
                  <Cell span={[2, 4, 4]}>
                    <Block
                      display="flex"
                      flexDirection="column"
                      alignItems={"center"}
                      width="100%"
                      overrides={{
                        Block: {
                          style: {
                            ...theme.borders.border600,
                            borderRadius: theme.borders.surfaceBorderRadius,
                            textOverflow: "ellipsis",
                          },
                        },
                      }}
                    >
                      <img
                        src={
                          "https://s3.beeesy.com/beeesy/listings/51/thumbnail_Grsoup_3_572c45fbd4.png"
                        }
                        className={css({
                          width: "100%",
                        })}
                      />
                      <Block padding={theme.sizing.scale500}>
                        <Paragraph4>{r.title.raw}</Paragraph4>
                      </Block>
                    </Block>
                  </Cell>
                ))}
              </Grid>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
};

export default ListingsSearchTile;
