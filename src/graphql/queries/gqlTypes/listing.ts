import { User } from "@graphql/fragments/gqlTypes/User";

export interface IListing {
  id: string;
  title: string;
  description: string;
  location: {
    longitude: number;
    latitude: number;
  };
  images: {
    id: string;
    url: string;
  }[];
  created_at: Date;
  user: User;
}
export interface IListingPayload {
  listing: IListing;
}
export interface IListingVariables {
  id: string;
}
export interface IListingsPayload {
  listings?: IListing[];
}
export interface IListingsVariables {
  where: any;
  start: number;
  limit: number;
}
