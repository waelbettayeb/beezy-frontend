import MeiliSearch from "meilisearch";

const client = new MeiliSearch({
  host: `${process.env.NEXT_PUBLIC_SEARCH_ENDPOINT}`,
  apiKey: `${process.env.NEXT_PUBLIC_SEARCH_KEY}`,
});
export default client;
