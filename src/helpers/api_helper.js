import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/global.variable";

let isRefreshing = false;
let failedQueue = [];
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.headers.post["Content-Type"] = "application/json";
let blackListUrl = ["auth/login", "auth/refresh-token"];
// intercepting to capture errors
api.interceptors.request.use(function (req) {
  // req.withCredentials = true;
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    req.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
  }

  return req;
});
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => {
    return res.data ? res.data : res;
  },
  (err) => {
    const originalRequest = err.config;
    const isblacklist = originalRequest
      ? blackListUrl.includes(originalRequest.url)
      : true;
    if (!isblacklist && err.response) {
      if (err.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "bearer " + token;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        return new Promise(function (resolve, reject) {
          api
            .get("auth/refresh-token")
            .then((rs) => {
              originalRequest.headers["Authorization"] = `bearer ${rs}`;
              processQueue(null, rs);
              resolve(api(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
    }
    return Promise.reject(err);
  }
);

class APIClient {
  http;
  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_API_URL + "/api/",
      headers: this.#getHeadersConfig(),
      timeout: 100000,
    });
  }
  get = (url, params) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });
      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = api.get(`${url}?${queryString}`, params);
    } else {
      response = api.get(`${url}`);
    }
    return response;
  };

  create = (url, data, config) => {
    return api.post(url, data, config);
  };

  delete = (url, id) => {
    return api.delete(url + "/" + id);
  };

  #getHeadersConfig() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
}

export { APIClient };
