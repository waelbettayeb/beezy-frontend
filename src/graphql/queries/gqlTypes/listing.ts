import { User } from "@graphql/fragments/gqlTypes/User";

export interface IListingPayload {
  listing: {
    id: string;
    title: string;
    description: string;
    location: {
      longitude: number;
      latitude: number;
    };
    images: {
      url: string;
    }[];
    created_at: Date;
    user: User;
  };
}
export interface IListingVariables {
  id: string;
}
