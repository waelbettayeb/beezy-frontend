import { IListingPayload } from "@graphql/queries/gqlTypes/listing";

export interface CreateListingPayload {
  listing: {
    id: string;
  };
}

export interface CreateListingVariables {
  input: createListingInput;
}
export interface createListingInput {
  data: ListingInput;
}
export interface ListingInput {
  title: string;
  description?: string;
  images?: string[];
  location: {
    longitude: number;
    latitude: number;
  };
}
export interface UpdateListingVariables {
  input: {
    data: ListingInput;
    where: {
      id: string;
    };
  };
}

export interface UpdateListingPayload {
  updateListing: IListingPayload;
}
