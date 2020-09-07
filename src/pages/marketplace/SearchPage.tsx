import React, { useState } from "react";

import SearchNavBar from "@components/molecules/SearchNavBar/SearchNavBar";
import { useStyletron } from "baseui";
import ListingsSearchTile from "@components/molecules/ListingsSearchTile";
import { Cell, Grid } from "baseui/layout-grid";
import { Block } from "baseui/block";
import { Tabs, Tab } from "baseui/tabs";

import dynamic from "next/dynamic";
import { simpleReverseGeocoding } from "@components/molecules/MapLocationPicker";
import { Pagination, SIZE } from "baseui/pagination";
import MeiliClient from "@utils/MeiliSearchClient";
import { moveTo } from "geolocation-utils";
import ListingCard from "@components/molecules/ListingsSearchTile/ListingCard";
import Router from "next/router";
import { useDebounce } from "use-debounce";
import { useIntl } from "react-intl";

const Map = dynamic(() => import("@components/atoms/Map"), {
  ssr: false,
});
const LIMIT = 20;

const SearchPage = () => {
  const [css, theme] = useStyletron();
  const [searchedTerm, setSearchedTerm] = useState("");
  const [results, setResults] = useState(null);
  const [position, setPosition] = React.useState({
    latitude: 35.919809,
    longitude: 0.070937,
  });
  const [radius, setRadius] = React.useState(50);
  const [address, setAddress] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nbHits, setNbHits] = React.useState(0);
  const [processingTimeMs, setProcessingTimeMs] = React.useState(0);
  const index = MeiliClient.getIndex("listings");
  const [value] = useDebounce(searchedTerm, 1000);
  const [loading, setSetloading] = useState(false);

  React.useEffect(() => {
    const boundTopLeft = moveTo(
      { lat: position.latitude, lon: position.longitude },
      { distance: Math.sqrt(2 * Math.pow(radius * 1000, 2)), heading: 45 }
    );
    const boundBottomRight = moveTo(
      { lat: position.latitude, lon: position.longitude },
      { distance: Math.sqrt(2 * Math.pow(radius * 1000, 2)), heading: 225 }
    );
    // Create an scoped async function in the hook
    async function searchWithMeili() {
      setSetloading(true);
      index
        .search(value, {
          limit: LIMIT,
          offset: (currentPage - 1) * LIMIT,
          filters: `latitude < ${boundTopLeft.lat} AND  latitude > ${boundBottomRight.lat}  AND longitude < ${boundTopLeft.lon} AND  longitude > ${boundBottomRight.lon} `,
        })
        .then((search) => {
          setResults(search.hits);
          setNbHits((search as any).nbHits);
          setProcessingTimeMs(search.processingTimeMs);
          setCurrentPage(1);
          Router.replace(`/marketplace?q=${value}`);
          setSetloading(false);
        });
    }
    // Execute the created function directly
    searchWithMeili();
  }, [value, radius, position, currentPage]);

  React.useEffect(() => {
    const { q } = Router.query;
    setSearchedTerm((q as string) ?? "");
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
      simpleReverseGeocoding(crd.latitude, crd.longitude)
        .catch(function (error) {
          console.log(error);
          return "";
        })
        .then(function (json) {
          setAddress(json.address);
          return json.display_name;
        });
      console.log(`[geolocation]More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      simpleReverseGeocoding(position.latitude, position.longitude)
        .catch(function (error) {
          console.log(error);
          return "";
        })
        .then(function (json) {
          setAddress(json.address);
          return json.display_name;
        });
      console.warn(`ERROR[geolocation] (${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const [activeKey, setActiveKey] = React.useState("0");
  const getCity = () => {
    return (
      address?.town ||
      address?.city ||
      address?.state ||
      address?.county ||
      address?.village ||
      ""
    );
  };
  const intl = useIntl();
  return (
    <Block height="100vh" display={"flex"} flexDirection={"column"}>
      <SearchNavBar
        loading={loading}
        position={position}
        radius={radius}
        city={getCity()}
        searchTerm={searchedTerm}
        onSearchTermChange={(e) => {
          setSearchedTerm((e.target as HTMLTextAreaElement).value);
        }}
        onLocationChange={(lat, lon, radius, address) => {
          setPosition({
            latitude: lat,
            longitude: lon,
          });
          setRadius(radius);
          setAddress(address);
          console.log(address);
        }}
      />
      <Grid
        gridMargins={0}
        // gridGutters={0}
        overrides={{
          Grid: {
            style: ({ $theme }) => {
              return {
                minWidth: "100%",
                Width: "100%",
                margin: 0,
                flex: "1 1 auto",
              };
            },
          },
        }}
      >
        <Cell
          span={[0, 5, 8]}
          overrides={{
            Cell: {
              style: ({ $theme }) => {
                return {
                  height: "100%",
                  display: "flex",
                };
              },
            },
          }}
        >
          <Block
            height="100%"
            maxHeight="100%"
            display="flex"
            width="100%"
            flexDirection="column"
            overflow="auto"
          >
            <Block flex="1 0 auto">
              <ListingsSearchTile
                results={results}
                start={(currentPage - 1) * LIMIT}
                end={(currentPage - 1) * LIMIT + results?.length}
                totalResults={nbHits}
                processingTimeMs={processingTimeMs}
              />
            </Block>
            <Pagination
              numPages={Math.ceil(nbHits / LIMIT)}
              size={SIZE.mini}
              currentPage={currentPage}
              onPageChange={({ nextPage }) => {
                setCurrentPage(Math.min(Math.max(nextPage, 1), 20));
              }}
              overrides={{
                Root: {
                  style: ({ $theme }) => {
                    return {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    };
                  },
                },
              }}
            />
          </Block>
        </Cell>
        <Cell
          span={[0, 3, 4]}
          overrides={{
            Cell: {
              style: ({ $theme }) => {
                return {
                  maxHeight: "100%",
                  paddingLeft: "Opx!important",
                  paddingRight: "Opx!important",
                };
              },
            },
          }}
        >
          <Map
            lat={position.latitude}
            lng={position.longitude}
            markers={
              results &&
              results.map((r) => ({
                lat: r.latitude,
                lng: r.longitude,
                label: r.title,
                popupContent: (
                  <ListingCard
                    id={r.id}
                    imageUrl={r.images[0]?.file.url}
                    date={r.created_at}
                    title={r.title}
                    small
                  />
                ),
              }))
            }
          />
        </Cell>
        <Cell
          span={[4, 0]}
          overrides={{
            Cell: {
              style: ({ $theme }) => {
                return {
                  height: "100%",
                };
              },
            },
          }}
        >
          <Block
            height="100%"
            maxHeight="100%!important"
            display="flex"
            width="100%"
            flexDirection="column"
          >
            <Tabs
              onChange={({ activeKey }) => {
                setActiveKey(activeKey + "");
              }}
              activeKey={activeKey}
              overrides={{
                Root: {
                  style: ({ $theme }) => {
                    return {
                      display: "flex",
                      flex: "1 1 auto",
                    };
                  },
                },
                TabContent: {
                  style: ({ $theme }) => {
                    return {
                      height: "100%",
                      paddingLeft: "Opx!important",
                      paddingRight: "Opx!important",
                    };
                  },
                },
              }}
            >
              <Tab
                title={intl.formatMessage({
                  defaultMessage: "List",
                })}
              >
                <Block height={"100%"}>
                  <ListingsSearchTile
                    results={results}
                    start={(currentPage - 1) * LIMIT}
                    end={(currentPage - 1) * LIMIT + results?.length}
                    totalResults={nbHits}
                    processingTimeMs={processingTimeMs}
                  />
                </Block>
              </Tab>
              <Tab
                title={intl.formatMessage({
                  defaultMessage: "Map",
                })}
              >
                <Block height={"100%"}>
                  <Map
                    lat={position.latitude}
                    lng={position.longitude}
                    markers={
                      results &&
                      results.map((r) => ({
                        lat: r.latitude,
                        lng: r.longitude,
                        label: r.title,
                        popupContent: (
                          <ListingCard
                            id={r.id}
                            imageUrl={r.images[0]?.file.url}
                            date={r.created_at}
                            title={r.title}
                            small
                          />
                        ),
                      }))
                    }
                  />
                </Block>
              </Tab>
            </Tabs>
            <Pagination
              numPages={Math.ceil(nbHits / LIMIT)}
              size={SIZE.mini}
              currentPage={currentPage}
              onPageChange={({ nextPage }) => {
                setCurrentPage(Math.min(Math.max(nextPage, 1), 20));
              }}
              overrides={{
                Root: {
                  style: ({ $theme }) => {
                    return {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    };
                  },
                },
              }}
            />
          </Block>
        </Cell>
      </Grid>
    </Block>
  );
};

export default SearchPage;
