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
import { useDebounce } from "use-debounce/lib";
import { FormattedMessage, useIntl } from "react-intl";
import { Locale } from "@components/containers/Locale";
import useLocale from "@hooks/useLocale";

interface Props extends DrawerProps {}

const SearchDrawer = (props: Props) => {
  const [css, theme] = useStyletron();
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  const [searchedTerm, setSearchedTerm] = useState("");

  const [peopleResults, setPeopleResults] = useState(null);
  const [loading, setSetloading] = useState(false);
  const [listingsResults, setListingsResults] = useState(null);

  const peopleIndex = MeiliClient.getIndex("people");
  const listingsIndex = MeiliClient.getIndex("listings");
  const [value] = useDebounce(searchedTerm, 1000);

  React.useEffect(() => {
    // Create an scoped async function in the hook
    async function searchWithMeili() {
      setSetloading(true);
      peopleIndex
        .search(value, {
          limit: 10,
        })
        .then((peopleSearch) => setPeopleResults(peopleSearch.hits));

      listingsIndex
        .search(value, {
          limit: 10,
        })
        .then((listingsSearch) => {
          setListingsResults(listingsSearch.hits);
          setSetloading(false);
        });
    }
    // Execute the created function directly
    searchWithMeili();
  }, [value]);

  return (
    <Drawer
      {...props}
      onClose={(args) => {
        setSearchedTerm("");
        props.onClose(args);
      }}
      autoFocus
      anchor={locale === Locale.AR ? ANCHOR.right : ANCHOR.left}
    >
      <Block display="flex" flexDirection="column" height="100%">
        <Display4 marginBottom="scale500">
          <FormattedMessage defaultMessage="Search" />
        </Display4>
        <Input
          type="search"
          placeholder={intl.formatMessage({ defaultMessage: "Search..." })}
          value={searchedTerm}
          onChange={(e) =>
            setSearchedTerm((e.target as HTMLTextAreaElement).value)
          }
        />
        {peopleResults?.length > 0 && (
          <ProfilesSearchTile results={peopleResults} />
        )}
        <ListingsSearchTile
          searchedTerm={searchedTerm}
          results={listingsResults}
          loading={loading}
        />
      </Block>
    </Drawer>
  );
};

export default SearchDrawer;
