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
  HeadingXSmall,
  LabelLarge,
  LabelMedium,
  Paragraph1,
  ParagraphXSmall,
} from "baseui/typography";
import Divider from "@components/atoms/Divider";
import { ORIENTATION } from "@components/atoms/Divider/Divider";
import Footer from "@components/organisms/Footer";
import { useQuery } from "@apollo/react-hooks";
import { userQuery } from "@graphql/queries/user";
import Link from "next/link";
import {
  IListingsPayload,
  IListingsVariables,
} from "@graphql/queries/gqlTypes/listing";
import { listingsQuery } from "@graphql/queries/listing";
import ListingCard from "@components/molecules/ListingsSearchTile/ListingCard";

const Profile = () => {
  const [css, theme] = useStyletron();
  const { pid } = Router.query;
  const { data, error, loading } = useQuery(userQuery, {
    variables: { id: pid },
  });

  // !loading && !data?.user && Router.push("/404");
  const {
    data: listingsData,
    error: listingsError,
    loading: listingsLoading,
  } = useQuery<IListingsPayload, IListingsVariables>(listingsQuery, {
    variables: { where: { user: pid as string }, start: 0, limit: 10 },
  });
  return (
    <>
      <Block
        height="100vh"
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <AppNavBar />
        {data?.user && (
          <Grid
            overrides={{
              Grid: {
                style: ({ $theme }) => {
                  return {
                    minWidth: "100%",
                    Width: "100%",
                    margin: 0,
                    flex: "1 0 auto",
                  };
                },
              },
            }}
          >
            <Cell skip={[0, 1, 2]} span={[4, 6, 8]}>
              <Block
                display={"flex"}
                width={"100%"}
                flexDirection={"row"}
                alignItems={"center"}
                marginTop={theme.sizing.scale1000}
              >
                <Block marginRight={theme.sizing.scale1000}>
                  <Avatar
                    src={data?.user?.avatar?.url}
                    name={`${data?.user.firstName} ${data?.user.lastName}`}
                    size={theme.sizing.scale2400}
                  />
                </Block>
                <Block>
                  <LabelLarge>{`${data?.user.firstName} ${data?.user.lastName}`}</LabelLarge>
                  <Caption1>{`${data?.user.email}`}</Caption1>
                </Block>
              </Block>
              {data?.user.bio && (
                <>
                  <HeadingXSmall marginBottom={theme.sizing.scale300}>
                    Bio
                  </HeadingXSmall>
                  <ParagraphXSmall>{`${data?.user.bio}`}</ParagraphXSmall>
                </>
              )}
              {!listingsLoading &&
                !listingsLoading &&
                listingsData.listings.length > 0 && (
                  <>
                    <Divider orientation={ORIENTATION.left}>Listings</Divider>
                    <Grid gridMargins={10} gridGaps={10} gridGutters={10}>
                      {listingsData.listings.map((r) => (
                        <Cell span={[2, 2, 3]}>
                          <ListingCard
                            id={r.id}
                            imageUrl={r.images[0]?.url}
                            date={r.created_at}
                            title={r.title}
                          />
                        </Cell>
                      ))}
                    </Grid>
                  </>
                )}
            </Cell>
          </Grid>
        )}
      </Block>
      <Footer />
    </>
  );
};

export default Profile;
