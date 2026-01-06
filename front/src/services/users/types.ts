export type UsersCreateRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UsersCreateResponse = {
  id: string;
  name: string;
  email: string;
};
