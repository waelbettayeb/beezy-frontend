import React, { useState } from "react";
import { useStyletron } from "baseui";

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

import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import { Cell, Grid } from "baseui/layout-grid";
import { Button } from "baseui/button";
import { Card, StyledBody, StyledAction } from "baseui/card";
import TimeAgo from "@components/atoms/TimeAgo";
import Router from "next/router";

interface Props {
  results?: any;
}

const ListingsSearchTile = (props: Props) => {
  const { results } = props;
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        width: "100%",
        paddingLeft: 0,
        paddingRight: 0,
        flex: "1 0 auto",
      })}
    >
      {/* <PagingInfo
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
      /> */}
      {!results?.length && (
        <Block
          width="100%"
          height="100%"
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={theme.sizing.scale600}
        >
          <Label3 color={theme.colors.contentInverseSecondary}>No data</Label3>
        </Block>
      )}
      <Grid gridMargins={10} gridGaps={10} gridGutters={10}>
        {results &&
          results.map((r) => (
            <Cell span={[2, 2, 3]}>
              <div
                onClick={() => Router.push("/listing/[id]", `/listing/${r.id}`)}
              >
                <Card
                  headerImage={r.images[0]?.file.url}
                  title={<LabelMedium>{r.title}</LabelMedium>}
                  overrides={{
                    Body: {
                      style: ({ $theme }) => {
                        return {
                          width: "100%",
                          height: theme.sizing.scale1200,
                        };
                      },
                    },
                    HeaderImage: {
                      style: ({ $theme }) => {
                        return {
                          width: "100%",
                          height: theme.sizing.scale4800,
                        };
                      },
                    },
                  }}
                >
                  <StyledBody>
                    <Paragraph4>
                      <TimeAgo date={r.created_at} />
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
                        <Paragraph4>{r.title}</Paragraph4>
                      </Block>
                    </Block> */}
            </Cell>
          ))}
      </Grid>
    </div>
  );
};

export default ListingsSearchTile;
