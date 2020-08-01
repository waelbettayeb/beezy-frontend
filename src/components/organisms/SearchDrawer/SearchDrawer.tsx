import { useStyletron } from "baseui";
import { Drawer, ANCHOR, DrawerProps } from "baseui/drawer";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Input } from "baseui/input";
import { Display4 } from "baseui/typography";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

interface Props extends DrawerProps {}

const SearchDrawer = (props: Props) => {
  const [css, theme] = useStyletron();
  const connector = new AppSearchAPIConnector({
    searchKey: "search-v8bawehypykhcvry7p2soobg",
    engineName: "users",
    endpointBase: "http://127.0.0.1:3002",
    cacheResponses: true,
  });
  const config = {
    apiConnector: connector,
  };
  return (
    <Drawer {...props} autoFocus anchor={ANCHOR.left}>
      <Display4 marginBottom="scale500">Search</Display4>
      <SearchProvider config={config}>
        <WithSearch
          mapContextToProps={({
            searchTerm,
            setSearchTerm,
            results,
            setResultsPerPage,
            setCurrent,
          }) => ({
            searchTerm,
            setSearchTerm,
            results,
            setResultsPerPage,
            setCurrent,
          })}
        >
          {({
            searchTerm,
            setSearchTerm,
            results,
            setResultsPerPage,
            setCurrent,
          }) => {
            setResultsPerPage(10);
            setCurrent(1);
            return (
              <div>
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {results.map((r) => (
                  <div key={r.id.raw}>{r.lastname.raw}</div>
                ))}
              </div>
            );
          }}
        </WithSearch>
      </SearchProvider>
    </Drawer>
  );
};

export default SearchDrawer;
