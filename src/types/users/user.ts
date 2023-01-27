export type PartialUser = Partial<User>;

export interface UserInfo {
  user: User;
  loading: boolean;
  success: boolean;
  successSignup: boolean;
  successVerification: boolean;
  error: string;
}

export interface User {
  uuid: string;
  name: string;
  lastname: string;
  username: string;
  phone: string;
  photo: string;
  password: string;
  status: string;
}

export const EmptyUserState: PartialUser = {
  uuid: "",
  name: "",
  lastname: "",
  username: "",
  phone: "",
  photo: "",
  password: "",
};
