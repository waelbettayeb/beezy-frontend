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
  };
}
export interface IListingVariables {
  id: string;
}
