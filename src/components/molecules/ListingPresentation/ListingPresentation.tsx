import React, { ReactElement } from "react";
import { Grid, Cell, ALIGNMENT, BEHAVIOR } from "baseui/layout-grid";
import {
  Paragraph1,
  DisplaySmall,
  LabelLarge,
  ParagraphSmall,
  Caption1,
  Caption2,
  LabelMedium,
} from "baseui/typography";
import { useStyletron } from "baseui";
import { Search } from "baseui/icon";
import { Input, SIZE } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Block } from "baseui/block";
import { FormattedMessage } from "react-intl";
import SearchDrawer from "@components/organisms/SearchDrawer";
import {
  IListingPayload,
  IListingVariables,
} from "@graphql/queries/gqlTypes/listing";
import { listingQuery } from "@graphql/queries/listing";
import { useQuery } from "react-apollo";
import { Spinner } from "baseui/spinner";
import dynamic from "next/dynamic";
import { Carousel } from "react-responsive-carousel";
import TimeAgo from "@components/atoms/TimeAgo";
import { simpleReverseGeocoding } from "../MapLocationPicker";
import { Avatar } from "baseui/avatar";
import Router from "next/router";
import { Button } from "baseui/button";
import { useAuth } from "@hooks/useAuth";

const Map = dynamic(() => import("@components/atoms/Map"), {
  ssr: false,
});
interface Props {
  id: string;
}
export const config = { amp: "hybrid" };

const ListingPresentation: React.FC<Props> = (props) => {
  const { id } = props;
  const [css, theme] = useStyletron();
  const { data, error, loading } = useQuery<IListingPayload, IListingVariables>(
    listingQuery,
    {
      variables: { id },
    }
  );
  const [address, setAddress] = React.useState(null);
  const { listing } = !loading && !error && data;
  !loading &&
    !error &&
    simpleReverseGeocoding(
      listing.location.latitude,
      listing.location.longitude
    )
      .catch(function (error) {
        console.log(error);
        return "";
      })
      .then(function (json) {
        setAddress(json);
        return json.display_name;
      });
  const user = useAuth().user;
  return (
    <>
      <Inner h={70}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Grid
              overrides={{
                Grid: {
                  style: ({ $theme }) => ({
                    height: "100%",
                    width: "100%",
                  }),
                },
              }}
            >
              <Cell span={[4, 8, 12]}>
                <Block
                  display={"flex"}
                  width={"100%"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  padding={theme.sizing.scale400}
                >
                  <div
                    onClick={() =>
                      Router.push(
                        "/profile/[pid]",
                        `/profile/${listing?.user?.id}`
                      )
                    }
                  >
                    <Block
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      padding={theme.sizing.scale400}
                    >
                      <Block marginRight={theme.sizing.scale400}>
                        <Avatar
                          src={listing?.user?.avatar?.url}
                          name={`${listing?.user.firstName} ${listing?.user.lastName}`}
                        />
                      </Block>
                      <LabelMedium>{`${listing?.user.firstName} ${listing?.user.lastName}`}</LabelMedium>
                    </Block>
                  </div>
                  {user.id === listing.user.id && (
                    <Button
                      kind={"minimal"}
                      onClick={() =>
                        Router.push(
                          "/listing/edit/[id]",
                          `/listing/edit/${listing.id}`
                        )
                      }
                    >
                      Edit
                    </Button>
                  )}
                </Block>
              </Cell>
              <Cell span={[4, 4, 6]}>
                <Carousel
                  showArrows={true}
                  showIndicators={true}
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop
                  useKeyboardArrows
                  swipeable
                  emulateTouch
                >
                  {listing.images.length
                    ? listing.images.map((image) => <img src={image.url} />)
                    : [
                        <img
                          src={
                            "https://s3.beeesy.com/beeesy/Group_4_6c22228272.png"
                          }
                        />,
                      ]}
                </Carousel>
              </Cell>

              <Cell span={[4, 4, 6]}>
                <Block
                  display={"flex"}
                  flexDirection={"column"}
                  height={"100%"}
                >
                  <LabelLarge>{listing.title}</LabelLarge>
                  <Caption1>
                    <TimeAgo date={listing.created_at} />
                  </Caption1>

                  {listing.description && (
                    <ParagraphSmall>{listing.description}</ParagraphSmall>
                  )}
                  {address && <Caption1>{address.display_name}</Caption1>}
                  <Block flex={"1 0 auto"} minHeight={"20vh"}>
                    <Map
                      lat={listing.location.latitude}
                      lng={listing.location.longitude}
                      markers={[
                        {
                          lat: listing.location.latitude,
                          lng: listing.location.longitude,
                        },
                      ]}
                    />
                  </Block>
                </Block>
              </Cell>
            </Grid>
          </>
        )}
      </Inner>
    </>
  );
};
const Inner: React.FunctionComponent<{ h: number }> = ({
  children,
  h = 25,
}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        height: "100%",

        width: "100%",
      })}
    >
      {children}
    </div>
  );
};
export default ListingPresentation;
