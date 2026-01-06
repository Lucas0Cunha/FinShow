export type AuthSignInRequest = {
  email: string;
  password: string;
};

export type AuthSignInResponse = {
  name: string;
  email: string;
  token: string;
};
