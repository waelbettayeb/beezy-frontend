import React from "react";
import Head from "next/head";
import { StatefulInput } from "baseui/input";
import AppNavBar from "src/components/molecules/AppNavBar/AppNavBar";
import Hero from "src/components/molecules/Hero";
import Footer from "@components/organisms/Footer";
import { useAuth } from "@hooks/useAuth";
import { FormattedMessage, useIntl } from "react-intl";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import {
  DisplayMedium,
  DisplaySmall,
  DisplayXSmall,
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import { Grid, Cell } from "baseui/layout-grid";
import ListingCard from "@components/molecules/ListingsSearchTile/ListingCard";
import {
  IListingsPayload,
  IListingsVariables,
} from "@graphql/queries/gqlTypes/listing";
import { listingsQuery } from "@graphql/queries/listing";
import { useQuery } from "react-apollo";
import { Button } from "baseui/button";
import { buttonMessages } from "@utils/intl";
import useLocale from "@hooks/useLocale";
import { Locale } from "@components/containers/Locale";
import { ChevronRight, ChevronLeft } from "baseui/icon";
import Router from "next/router";

const Home: React.FC = () => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();
  const auth = useAuth();
  auth.getUser();
  const [css, theme] = useStyletron();
  const {
    data: listingsData,
    error: listingsError,
    loading: listingsLoading,
  } = useQuery<IListingsPayload, IListingsVariables>(listingsQuery, {
    variables: { limit: 4, start: 0 },
  });
  return (
    <React.Fragment>
      <AppNavBar />
      <Hero />
      <Block
        backgroundColor={theme.colors.backgroundSecondary}
        paddingTop={theme.sizing.scale1000}
        paddingBottom={theme.sizing.scale1000}
      >
        <Grid>
          <Cell span={[4, 8, 12]}>
            <Block
              display={"flex"}
              flexDirection={"column"}
              justifyItems={"center"}
              alignItems={"center"}
              width="100%"
            >
              <DisplayXSmall
                $style={{
                  textAlign: "center",
                }}
              >
                <FormattedMessage defaultMessage="Join the community" />
              </DisplayXSmall>
              <ParagraphMedium
                $style={{
                  textAlign: "center",
                }}
              >
                <FormattedMessage
                  defaultMessage="This is the place for you
                to listen, learn, ask questions, and share your story with
                others who are going through the same thing"
                />
              </ParagraphMedium>
              <Button
                kind={"minimal"}
                onClick={() => Router.push("https://discuss.beeesy.com/")}
                endEnhancer={() =>
                  locale !== Locale.AR ? (
                    <ChevronRight size={24} />
                  ) : (
                    <ChevronLeft size={24} />
                  )
                }
              >
                {intl.formatMessage(buttonMessages.clickHere)}
              </Button>
            </Block>
          </Cell>
        </Grid>
      </Block>
      {!listingsLoading && listingsData?.listings?.length > 0 && (
        <Block
          paddingTop={theme.sizing.scale1000}
          paddingBottom={theme.sizing.scale1000}
        >
          <Grid>
            <Cell skip={[0, 0, 1]} span={[4, 8, 10]}>
              <Block
                display={"flex"}
                flexDirection={"column"}
                justifyItems={"center"}
                alignItems={"center"}
                width="100%"
              >
                <DisplayXSmall
                  $style={{
                    textAlign: "center",
                  }}
                  marginBottom={theme.sizing.scale700}
                >
                  <FormattedMessage defaultMessage="Latest listings" />
                </DisplayXSmall>
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
              </Block>
            </Cell>
          </Grid>
        </Block>
      )}

      <Footer />
    </React.Fragment>
  );
};
export default Home;
