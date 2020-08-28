import Head from "next/head";

import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
  query getInfo {
    info {
      Name
    }
  }
`;
export interface TData {
  info: Info;
}
export interface Info {
  __typename: "Info";
  Name: string;
}

const about: React.FC = () => {
  const { loading, data } = useQuery<TData, null>(query);
  return <div>{loading ? "loading..." : data.info.Name}</div>;
};
export default about;
