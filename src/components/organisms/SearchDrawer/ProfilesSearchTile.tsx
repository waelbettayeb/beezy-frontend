import React, { useState } from "react";
import { useStyletron } from "baseui";
import { Label3 } from "baseui/typography";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";

import { Avatar } from "baseui/avatar";
import { ChevronRight } from "baseui/icon";
import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import Router from "next/router";

interface Props {
  results: any[];
}

const ProfilesSearchTile = (props: Props) => {
  const { results } = props;
  const [css, theme] = useStyletron();

  return (
    <ul
      className={css({
        width: "100%",
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      {results && !results.length ? (
        <Block
          width="100%"
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Label3 color={theme.colors.contentInverseSecondary}>No data</Label3>
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
      {results &&
        results.map((r) => (
          <div
            onClick={() => Router.push("/profile/[pid]", `/profile/${r.id}`)}
          >
            <ListItem
              endEnhancer={() => <ChevronRight />}
              artwork={() => (
                <Avatar
                  src={r.avatar[0]?.file.url}
                  name={`${r.firstName} ${r.lastName}`}
                  size="scale1200"
                />
              )}
              artworkSize={ARTWORK_SIZES.SMALL}
            >
              <ListItemLabel description={r.email}>
                {`${r.firstName} ${r.lastName}`}
              </ListItemLabel>
            </ListItem>
          </div>
        ))}
    </ul>
  );
};

export default ProfilesSearchTile;
