import React, { useState } from "react";

import SearchNavBar from "@components/molecules/SearchNavBar/SearchNavBar";
import { useStyletron } from "baseui";
import ListingsSearchTile from "@components/molecules/ListingsSearchTile";
import { Cell, Grid } from "baseui/layout-grid";
import { Block } from "baseui/block";
import { Tabs, Tab } from "baseui/tabs";

import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";
import Router from "next/router";
import { Avatar } from "baseui/avatar";
import {
  Caption1,
  DisplayMedium,
  HeadingXSmall,
  LabelLarge,
  LabelMedium,
  Paragraph1,
  ParagraphXSmall,
} from "baseui/typography";
import Divider from "@components/atoms/Divider";
import { ORIENTATION } from "@components/atoms/Divider/Divider";
import Footer from "@components/organisms/Footer";
import Link from "next/link";
import Markdown from "@components/organisms/Markdown";
import { useQuery } from "react-apollo";
import { articleQuery } from "@graphql/queries/blog";
import {
  IArticlePayload,
  IArticleVariables,
} from "@graphql/queries/gqlTypes/blog";
import TimeAgo from "@components/atoms/TimeAgo";

const Profile = () => {
  const [css, theme] = useStyletron();
  const { id } = Router.query;
  const { data, error, loading } = useQuery<IArticlePayload, IArticleVariables>(
    articleQuery,
    {
      variables: {
        id: id as string,
      },
    }
  );
  return (
    <>
      <Block
        minHeight="100vh"
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <AppNavBar />
        {!loading && !error && (
          <>
            <Grid
              overrides={{
                Grid: {
                  style: ({ $theme }) => {
                    const theme = $theme;
                    return {
                      width: "100%",
                    };
                  },
                },
              }}
            >
              <Cell skip={[0, 1, 2]} span={[4, 6, 8]}>
                <DisplayMedium>{data.blogPost.title}</DisplayMedium>
                <Caption1>
                  <TimeAgo date={data.blogPost.created_at} />
                </Caption1>
                <Markdown source={data.blogPost.content} />
              </Cell>
            </Grid>
          </>
        )}
      </Block>
      <Footer />
    </>
  );
};

export default Profile;
