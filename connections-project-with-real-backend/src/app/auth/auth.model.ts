export interface ICredentials {
  name?: string;
  email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  uid: string;
}

export interface IString {
  S: string;
}

export interface IProfileResponse {
  name: IString;
  uid: IString;
  email: IString;
  createdAt: IString;
}
