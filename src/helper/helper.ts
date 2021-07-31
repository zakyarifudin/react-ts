import axios, { AxiosError } from "axios";

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
  return axios
    .get(url, {
      params: params,
      headers: noAuthHeaders(),
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};

export const postNoAuth = async (url: string, data: any = {}) => {
  return axios
    .post(url, {
      headers: noAuthHeaders(),
      data: data,
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};

export const login = async (url: string, data: any = {}) => {
  var form = new FormData();
  form.append("client_id", "3");
  form.append("client_secret", "fBDg8MlNVt8ZPRCxqU14zPCtjAH8jH4f3pmNKsR3");
  form.append("grant_type", "password");
  form.append("username", data.username);
  form.append("password", data.password);

  return axios
    .post(url, form, {
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
      },
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};

export const get = async <T = any>(url: string) => {
  // console.log("url", authHeaders(), authToken());
  return axios
    .get<T>(url, {
      headers: authHeaders(),
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};

export const post = async (url: string, data: any = {}) => {
  return axios
    .post(url, data, {
      headers: authHeaders(),
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};

export const put = async (url: string, data: any = {}) => {
  return axios
    .put(url, data, {
      headers: authHeaders(),
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};

export const destroy = async (url: string) => {
  return axios
    .delete(url, {
      headers: authHeaders(),
    })
    .then((r) => r.data)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        throw e;
      }
    });
};
