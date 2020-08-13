import React, { ReactElement } from "react";
import { Grid, Cell, ALIGNMENT, BEHAVIOR } from "baseui/layout-grid";
import {
  Paragraph1,
  DisplaySmall,
  LabelLarge,
  ParagraphSmall,
  Caption1,
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

const Map = dynamic(() => import("@components/atoms/Map"), {
  ssr: false,
});
interface Props {
  id: string;
}
export const config = { amp: "hybrid" };

const ListingPresentation: React.FC<Props> = (props) => {
  const { id } = props;
  const [css, _theme] = useStyletron();
  const { data, error, loading } = useQuery<IListingPayload, IListingVariables>(
    listingQuery,
    {
      variables: { id },
    }
  );
  const { listing } = !loading && data;
  !loading && console.log(listing.images);

  return (
    <>
      <Inner h={100}>
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
              {listing.images.length !== 0 && (
                <Cell span={[4, 4, 6]}>
                  <Carousel
                    showArrows={true}
                    showIndicators={true}
                    showStatus={false}
                    showThumbs={false}
                    useKeyboardArrows
                    swipeable
                    emulateTouch
                  >
                    {listing.images.map((image) => (
                      <img src={image.url} />
                    ))}
                  </Carousel>
                </Cell>
              )}
              <Cell span={listing.images.length ? [4, 4, 6] : [4, 8, 12]}>
                <LabelLarge>{listing.title}</LabelLarge>
                <Caption1></Caption1>
                <ParagraphSmall>{listing.description}</ParagraphSmall>
                <Block height={"50vh"}>
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
        color: theme.colors.accent700,
        padding: ".25rem",
        height: h + "vh",
      })}
    >
      {children}
    </div>
  );
};
export default ListingPresentation;
