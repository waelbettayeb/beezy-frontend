import Head from 'next/head'

import { useQuery } from 'react-apollo'
import gql from 'graphql-tag';

const query = gql`
    query getInfo {
        info{
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
export default function about() {
	const { loading, data } = useQuery<TData, null>(query)
	return (
        <div>
		<Head>
		<title>About</title>
		<link rel="icon" href="/favicon.ico" />
		</Head>
        {loading? "loading..." : data.info.Name}
        </div>
		)
	}
	