import React from "react";
import { useStyletron } from "baseui";

import { Caption2, Label3 } from "baseui/typography";

import { Block } from "baseui/block";
import { Cell, Grid } from "baseui/layout-grid";

import ListingCard from "./ListingCard";
import { FormattedMessage } from "react-intl";

interface Props {
  results?: any;
  start?: number;
  end?: number;
  totalResults?: number;
  processingTimeMs?: number;
}

const ListingsSearchTile = (props: Props) => {
  const { results, start, end, totalResults, processingTimeMs } = props;
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
      <Block
        display={"flex"}
        width={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Caption2>
          <FormattedMessage
            defaultMessage='{start} - {end} "About {totalResults} results (
          {processingTimeS} seconds)"'
            values={{
              start,
              end,
              totalResults,
              processingTimeS: processingTimeMs / 1000,
            }}
          />
        </Caption2>
      </Block>

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
          <Label3 color={theme.colors.contentInverseSecondary}>
            <FormattedMessage defaultMessage="No data" />
          </Label3>
        </Block>
      )}
      <Grid gridMargins={10} gridGaps={10} gridGutters={10}>
        {results &&
          results.map((r) => (
            <Cell span={[2, 2, 3]}>
              <ListingCard
                id={r.id}
                imageUrl={r.images[0]?.file.url}
                date={r.created_at}
                title={r.title}
              />

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
