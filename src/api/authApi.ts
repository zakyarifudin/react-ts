import { login, get } from "../helper/helper";

export interface IUserAuth {
  email: string;
  password: string;
}

export const authLogin = (params: IUserAuth) => {
  return login("/oauth/token", {
    username: params.email,
    password: params.password,
  });
};

export const userAuth = () => {
  return get("api/user-auth");
};

export const authLogout = () => {
  return get("api/user-logout");
};
