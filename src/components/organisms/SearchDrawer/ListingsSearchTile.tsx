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
import Router from "next/router";
import { Cell, Grid } from "baseui/layout-grid";
import TimeAgo from "@components/atoms/TimeAgo";
import { Card, StyledAction, StyledBody } from "baseui/card";
import MeiliClient from "@utils/MeiliSearchClient";
import { Spinner } from "baseui/spinner";
import ListingCard from "@components/molecules/ListingsSearchTile/ListingCard";
import { FormattedMessage } from "react-intl";

interface Props {
  results: any[];
  loading?: boolean;
  searchedTerm?: string;
}

export const ListingsSearchTile = (props: Props) => {
  const { results, loading, searchedTerm } = props;
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
      {!results?.length ? (
        <Block
          width="100%"
          height="100%"
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={theme.sizing.scale600}
        >
          {loading ? (
            <Spinner />
          ) : (
            <Label3 color={theme.colors.contentInverseSecondary}>
              <FormattedMessage defaultMessage="No data" />
            </Label3>
          )}
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
          <Label3>
            <FormattedMessage defaultMessage="Marketplace" />
          </Label3>
          {results.length > 6 && (
            <StyledLink
              onClick={() => Router.push(`/marketplace?q=${searchedTerm}`)}
            >
              <FormattedMessage defaultMessage="Show more" />
            </StyledLink>
          )}
        </div>
      )}
      <Block display="flex" overflow={"scrollY"} width={"100%"}>
        {results &&
          results
            .slice(0, 6)
            .map((r) => (
              <ListingCard
                id={r.id}
                imageUrl={r.images[0]?.file.url}
                date={r.created_at}
                title={r.title}
                small
              />
            ))}
      </Block>
    </div>
  );
};

export default ListingsSearchTile;
