export type AuthCredentials = {
  email?: string;
  password?: string;
  phoneNumber?: string;
  OTPCode?: string;
};

export type Donor = {
  name: string;
  surname: string;
  sex: string;
  age: number;
  phoneNumber: number;
  date: Date;
  email: string;
  password: string;
};

export type UserType = "STAFF" | "ADMIN" | "PATIENT";

export type GetListParams = {
  resource: string;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
};

export type Option = {
  id: string;
  name: string;
};
