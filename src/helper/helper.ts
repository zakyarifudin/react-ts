import axios from "axios";

axios.defaults.baseURL = "http://localhost:9999";

export const authToken = () => {
  return localStorage.getItem("bearer");
};

export const userData = () => {
  const user = JSON.parse(String(localStorage.getItem("user")));
  return user;
};

export const noAuthHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const authHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authToken(),
  };
};

export const getNoAuth = async (url: string, params: any = {}) => {
  return await axios.get(url, {
    params: params,
    headers: noAuthHeaders(),
  });
};

export const postNoAuth = async (url: string, data: any = {}) => {
  return await axios.post(url, {
    headers: noAuthHeaders(),
    data: data,
  });
};

export const login = async (url: string, data: any = {}) => {
  var form = new FormData();
  form.append("client_id", "3");
  form.append("client_secret", "fBDg8MlNVt8ZPRCxqU14zPCtjAH8jH4f3pmNKsR3");
  form.append("grant_type", "password");
  form.append("username", data.username);
  form.append("password", data.password);

  return await axios.post(url, form, {
    headers: {
      Accept: "application/json, application/xml, text/plain, text/html, *.*",
    },
  });
};

export const get = async (url: string) => {
  // console.log("url", authHeaders(), authToken());
  return await axios.get(url, {
    headers: authHeaders(),
  });
};

export const post = async (url: string, data: any = {}) => {
  return await axios.post(url, data, {
    headers: authHeaders(),
  });
};

export const put = async (url: string, data: any = {}) => {
  return await axios.put(url, data, {
    headers: authHeaders(),
  });
};

export const destroy = async (url: string) => {
  return await axios.delete(url, {
    headers: authHeaders(),
  });
};
