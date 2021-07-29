import { login, get } from "../helper/helper";

export interface IUserAuthRequest {
  email: string;
  password: string;
}

export interface IUserAuthResponse {
  id_user: string;
  name: string;
  email: string;
}

export const authLogin = (params: IUserAuthRequest) => {
  return login("/oauth/token", {
    username: params.email,
    password: params.password,
  });
};

export const userAuth = () => {
  return get<IUserAuthResponse>("api/user-auth");
};

export const authLogout = () => {
  return get("api/user-logout");
};
