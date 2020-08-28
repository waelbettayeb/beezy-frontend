import React, { useState } from "react";
import { useStyletron } from "baseui";
import {
  Caption2,
  Label3,
  LabelMedium,
  LabelXSmall,
  Paragraph4,
} from "baseui/typography";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";

import { Avatar } from "baseui/avatar";
import { ChevronRight } from "baseui/icon";
import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import Router from "next/router";
import TimeAgo from "@components/atoms/TimeAgo";
import { Card, StyledAction, StyledBody } from "baseui/card";
import { FormattedMessage } from "react-intl";

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
          <Label3 color={theme.colors.contentInverseSecondary}>
            <FormattedMessage defaultMessage="No data" />
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
            marginBottom: theme.sizing.scale200,
          })}
        >
          <Label3>
            <FormattedMessage defaultMessage="People" />
          </Label3>
          {/* <StyledLink href="#">Show more</StyledLink> */}
        </div>
      )}
      <Block display="flex" overflow={"auto"} width={"100%"}>
        {results &&
          results.map((r) => (
            <div
              onClick={() => Router.push("/profile/[pid]", `/profile/${r.id}`)}
            >
              <Block
                height={theme.sizing.scale3200}
                width={theme.sizing.scale2400}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-around"}
                overrides={{
                  Block: {
                    style: ({ $theme }) => {
                      return {
                        ...theme.borders.border600,
                        padding: theme.sizing.scale300,
                        marginRight: theme.sizing.scale200,
                      };
                    },
                  },
                }}
              >
                <Avatar
                  src={r.avatar[0]?.file.url}
                  name={`${r.firstName} ${r.lastName}`}
                  size="scale1400"
                />

                <LabelXSmall>{`${r.firstName} ${r.lastName}`}</LabelXSmall>
              </Block>
            </div>
          ))}
      </Block>
    </ul>
  );
};

export default ProfilesSearchTile;
