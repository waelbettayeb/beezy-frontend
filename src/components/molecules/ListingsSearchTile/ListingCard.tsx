import React from "react";
import TimeAgo from "@components/atoms/TimeAgo";
import { useStyletron } from "baseui";
import { Card, StyledAction, StyledBody } from "baseui/card";
import { LabelMedium, Paragraph4 } from "baseui/typography";
import Router from "next/router";

interface Props {
  id?: string;
  imageUrl?: string;
  title?: string;
  date?: Date;
  small?: boolean;
}

const ListingCard = (props: Props) => {
  const { id, imageUrl, title, date, small } = props;
  const [css, theme] = useStyletron();
  return (
    <div onClick={() => Router.push("/listing/[id]", `/listing/${id}`)}>
      <Card
        headerImage={imageUrl}
        title={<LabelMedium>{title}</LabelMedium>}
        overrides={{
          Root: {
            style: ({ $theme }) => {
              return {
                marginRight: theme.sizing.scale200,
                marginBottom: theme.sizing.scale200,
              };
            },
          },
          HeaderImage: {
            style: ({ $theme }) => {
              return {
                width: "100%",
                height: small ? theme.sizing.scale3200 : theme.sizing.scale4800,
              };
            },
          },
          Body: {
            style: ({ $theme }) => {
              return {
                width: "100%",
                height: small ? theme.sizing.scale400 : theme.sizing.scale900,
              };
            },
          },
        }}
      >
        <StyledBody>
          <Paragraph4>
            <TimeAgo date={date} />
          </Paragraph4>
        </StyledBody>
        <StyledAction></StyledAction>
      </Card>
    </div>
  );
};

export default ListingCard;
