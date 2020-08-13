export interface UserMe {
  __typename: "UserMe";
  id: string;
  username: string;
  email: string;
  firstName: String;
  lastName: String;
  gender: GENDER;
  dateOfBirth: Date;
}
export enum GENDER {
  male,
  female,
}
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: String;
  lastName: String;
  gender: GENDER;
  dateOfBirth: Date;
  Bio: string;
  avatar: {
    url: string;
  };
}
