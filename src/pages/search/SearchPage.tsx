import React, { useState } from "react";

import SearchNavBar from "@components/molecules/SearchNavBar/SearchNavBar";
import { useStyletron } from "baseui";

const SearchPage = () => {
  const [css, theme] = useStyletron();
  const [searchedTerm, setSearchedTerm] = useState("");
  return (
    <React.Fragment>
      <SearchNavBar
        searchTerm={searchedTerm}
        onSearchTermChange={(e) =>
          setSearchedTerm((e.target as HTMLTextAreaElement).value)
        }
      />
    </React.Fragment>
  );
};

export default SearchPage;
