import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/global.variable";
import { StatusCode } from "./constants/api";
import queryString from "query-string";


class AxiosInstance {
  #_axiosInstance;
  #blackList = ["auth/login", "auth/refresh-token"];

  constructor() {
    this.#_axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL + "/api/",
      timeout: 100000,
    });
    this.#_axiosInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          ...config.headers,
          ...this.getHeader(),
        };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.#_axiosInstance.interceptors.response.use(
      (response) => response?.data ?? response,
      async (err) => {
        const errCode = err?.response?.status;
        const originalConfig = err.config;

        const isBlacklist = originalConfig
          ? this.#blackList.includes(originalConfig.url)
          : true;

        if (
          errCode === StatusCode.UnAuthorized &&
          this.getToken() &&
          this.getRefreshToken() &&
          !originalConfig._retry &&
          !isBlacklist
        ) {
          originalConfig._retry = true;
          return await this.handleRefreshToken(originalConfig);
        }
        // else if (errCode === StatusCode.ManyRequest) {
        //   Notify.failure("Many requests, try again after some minutes!");
        // } else if (errCode === StatusCode.ServerError) {
        //   Notify.failure("Something went wrong, try again after some minutes!");
        // } else if (errCode === StatusCode.NetworkError) {
        //   Notify.failure("Connection network error, Please check network!");
        // }
        return Promise.reject(err);
      }
    );
  }

  /**
   * @fetch method auto inject header token.
   * @param url - { String }.
   * @params - { Object }.
   * @config - { Object }.
   * @response Promise axios get method.
   * */
  fetch(url, params = {}, config = {}) {
    return this.#_axiosInstance.get(
      `${url}?${queryString.stringify(params)}`,
      config
    );
  }

  /**
   * @post method auto inject header token.
   * @param url - { String }
   * @param payload - { Object }
   * @config - { Object }.
   * @response Promise axios post method.
   * */
  post(url, payload = {}, config = {}) {
    return this.#_axiosInstance.post(url, payload, config);
  }

  /**
   * @patch method auto inject header token.
   * @param url - { String }, payload - { String }.
   * @param payload - { Object }.
   * @config - { Object }.
   * @response Promise axios patch method.
   * */
  patch(url, payload = {}, config = {}) {
    return this.#_axiosInstance.patch(url, payload, config);
  }

  /**
   * @delete method auto inject header token.
   * @param url - { String }
   * @param payload - { Object }.
   * @config - { Object }.
   * @response Promise axios delete method.
   * */
  delete(url, payload= {}, config = {}) {
    return this.#_axiosInstance.delete(
      `${url}?${queryString.stringify(payload)}`,
      config
    );
  }

  /**
   * @get token header from session storage.
   * @return Header axios object.
   * */
  getHeader() {
    return {
      "Content-Type": "application/json",
      "x-access-token": this.getToken(),
    };
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN) || "";
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN) || "";
  }

  async handleRefreshToken(originalConfig) {
    try {
      const rs = await this.#_axiosInstance.get("auth/refresh-token");
      // localStorage.setItem(ACCESS_TOKEN, JSON.stringify(rs.accessToken));
      // localStorage.setItem(REFRESH_TOKEN, JSON.stringify(rs.refreshToken));
      //TODO: update token
      return this.#_axiosInstance(originalConfig);
    } catch (_error) {
      return Promise.reject(_error);
    }
  }
}

export const apiClient = new AxiosInstance()

