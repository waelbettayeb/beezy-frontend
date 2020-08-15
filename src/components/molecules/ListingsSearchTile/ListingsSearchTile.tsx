import React, { useState } from "react";
import { useStyletron } from "baseui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  Caption1,
  Caption2,
  Label3,
  LabelMedium,
  LabelSmall,
  LabelXSmall,
  Paragraph1,
  Paragraph4,
} from "baseui/typography";

import {
  SearchProvider,
  WithSearch,
  PagingInfo,
  Paging,
} from "@elastic/react-search-ui";

import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import { Cell, Grid } from "baseui/layout-grid";
import { Button } from "baseui/button";
import { Card, StyledBody, StyledAction } from "baseui/card";
import TimeAgo from "@components/atoms/TimeAgo";
import Router from "next/router";

interface Props {
  resultsPerPage?: number;
  searchedTerm: string;
  onSearchEnd?: (result) => void;
  setNumPage?: (numPage) => void;
  lat: number;
  lon: number;
  distance: number;
  currentPage: number;
}

const ListingsSearchTile = (props: Props) => {
  const {
    resultsPerPage,
    onSearchEnd,
    lat,
    lon,
    distance,
    currentPage,
    setNumPage,
    searchedTerm,
  } = props;
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
          current,
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          setCurrent,
          addFilter,
          totalResults,
          reset,
        }) => ({
          current: currentPage,
          searchTerm: searchedTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          resultsPerPage: props.resultsPerPage,
          setCurrent,
          addFilter,
          totalResults,
          reset,
        })}
      >
        {({
          current,
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          resultsPerPage,
          setCurrent,
          addFilter,
          totalResults,
          reset,
        }) => {
          console.log(current);
          setSearchTerm(searchTerm);
          onSearchEnd(results);
          setResultsPerPage(resultsPerPage);
          addFilter("location", {
            distance,
            unit: "km",
            center: `${lat},${lon}`,
          });
          setCurrent(current);
          setNumPage && setNumPage(Math.ceil(totalResults / resultsPerPage));
          return (
            <div
              className={css({
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
                flex: "1 0 auto",
              })}
            >
              <PagingInfo
                view={({ start, end, totalResults }) => (
                  <Block
                    display={"flex"}
                    width={"100%"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Caption2>
                      {start} - {end} (Total results: {totalResults})
                    </Caption2>
                  </Block>
                )}
              />
              {!results.length && (
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
              )}
              <Grid gridMargins={10} gridGaps={10} gridGutters={10}>
                {results.map((r) => (
                  <Cell span={[2, 2, 4]}>
                    <div
                      onClick={() =>
                        Router.push(
                          "/listing/[id]",
                          `/listing/${r.id.raw.substring(8)}`
                        )
                      }
                    >
                      <Card
                        headerImage={r.url.raw}
                        title={<LabelMedium>{r.title.raw}</LabelMedium>}
                      >
                        <StyledBody>
                          <Paragraph4>
                            <TimeAgo date={r.created_at?.raw} />
                          </Paragraph4>
                        </StyledBody>
                        <StyledAction></StyledAction>
                      </Card>
                    </div>

                    {/* <Block
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
                          "https://s3.beeesy.com/beeesy/listings/51/thumbnail_Group_3_572c45fbd4.png"
                        }
                        className={css({
                          width: "100%",
                        })}
                      />
                      <Block padding={theme.sizing.scale500}>
                        <Paragraph4>{r.title.raw}</Paragraph4>
                      </Block>
                    </Block> */}
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
