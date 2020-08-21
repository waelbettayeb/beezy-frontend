import React, { useState } from "react";
import { useStyletron } from "baseui";
import { Drawer, ANCHOR, DrawerProps } from "baseui/drawer";
import { Input } from "baseui/input";
import { Display4, Label3, Label4 } from "baseui/typography";
import MeiliClient from "@utils/MeiliSearchClient";
import { Block } from "baseui/block";
import ProfilesSearchTile from "./ProfilesSearchTile";
import ListingsSearchTile from "./ListingsSearchTile";
import LoadingScreen from "@components/molecules/LoadingScreen";

interface Props extends DrawerProps {}

const SearchDrawer = (props: Props) => {
  const [css, theme] = useStyletron();

  const [searchedTerm, setSearchedTerm] = useState("");

  const [peopleResults, setPeopleResults] = useState(null);
  const [loading, setSetloading] = useState(false);
  const [listingsResults, setListingsResults] = useState(null);

  const peopleIndex = MeiliClient.getIndex("people");
  const listingsIndex = MeiliClient.getIndex("listings");

  React.useEffect(() => {
    // Create an scoped async function in the hook
    async function searchWithMeili() {
      setSetloading(true);
      const peopleSearch = await peopleIndex.search(searchedTerm, {
        limit: 10,
      });
      setPeopleResults(peopleSearch.hits);

      const listingsSearch = await listingsIndex.search(searchedTerm);
      setListingsResults(listingsSearch.hits);
      setSetloading(false);
    }
    // Execute the created function directly
    searchWithMeili();
  }, [searchedTerm]);
  return (
    <Drawer
      {...props}
      onClose={(args) => {
        setSearchedTerm("");
        props.onClose(args);
      }}
      autoFocus
      anchor={ANCHOR.left}
    >
      <Block display="flex" flexDirection="column" height="100%">
        <Display4 marginBottom="scale500">Search</Display4>
        <Input
          type="search"
          placeholder="Search..."
          value={searchedTerm}
          onChange={(e) =>
            setSearchedTerm((e.target as HTMLTextAreaElement).value)
          }
        />
        {peopleResults?.length > 0 && (
          <ProfilesSearchTile results={peopleResults} />
        )}
        <ListingsSearchTile results={listingsResults} loading={loading} />
      </Block>
    </Drawer>
  );
};

export default SearchDrawer;
