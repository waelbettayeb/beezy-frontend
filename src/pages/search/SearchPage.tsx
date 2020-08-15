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

const Map = dynamic(() => import("@components/atoms/Map"), {
  ssr: false,
});
const SearchPage = () => {
  const [css, theme] = useStyletron();
  const [searchedTerm, setSearchedTerm] = useState("");
  const [results, setResults] = useState(null);
  const [position, setPosition] = React.useState({
    latitude: 35.919809,
    longitude: 0,
  });
  const [radius, setRadius] = React.useState(50);
  const [address, setAddress] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numPage, setNumPage] = React.useState(1);

  React.useEffect(() => {
    simpleReverseGeocoding(position.latitude, position.longitude)
      .catch(function (error) {
        console.log(error);
        return "";
      })
      .then(function (json) {
        setAddress(json.address);
        return json.display_name;
      });
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
  return (
    <Block height="100vh" display={"flex"} flexDirection={"column"}>
      <SearchNavBar
        position={position}
        radius={radius}
        city={getCity()}
        searchTerm={searchedTerm}
        onSearchTermChange={(e) =>
          setSearchedTerm((e.target as HTMLTextAreaElement).value)
        }
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
                searchedTerm={searchedTerm}
                lat={position.latitude}
                lon={position.longitude}
                distance={radius}
                currentPage={currentPage}
                resultsPerPage={10}
                setNumPage={(numPage) => setNumPage(numPage)}
                onSearchEnd={(result) => {
                  setResults(result);
                }}
              />
            </Block>
            <Pagination
              numPages={numPage}
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
                lat: r.latitude?.raw,
                lng: r.longitude?.raw,
                label: r.title?.raw,
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
              <Tab title="List">
                <Block height={"100%"}>
                  <ListingsSearchTile
                    searchedTerm={searchedTerm}
                    lat={position.latitude}
                    lon={position.longitude}
                    distance={radius}
                    currentPage={currentPage}
                    resultsPerPage={10}
                    setNumPage={(numPage) => setNumPage(numPage)}
                    onSearchEnd={(result) => {
                      setResults(result);
                    }}
                  />
                </Block>
              </Tab>
              <Tab title={`Map`}>
                <Block height={"100%"}>
                  <Map
                    lat={position.latitude}
                    lng={position.longitude}
                    markers={
                      results &&
                      results.map((r) => ({
                        lat: r.latitude?.raw,
                        lng: r.longitude?.raw,
                        label: r.title?.raw,
                      }))
                    }
                  />
                </Block>
              </Tab>
            </Tabs>
            <Pagination
              numPages={numPage}
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
