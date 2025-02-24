/**
 * create a new instance with a custom configuration
 */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { LOCAL_STORAGE_KEY } from "@/utils/constant";
import { getCookie } from "@/utils/storage";
import handleErrorGlobally from "../error-handler";

export const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
});

instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const token = getCookie<string>(LOCAL_STORAGE_KEY.accessToken);
    const headers = config.headers;

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return { ...config, headers };
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const responseError = {
      data: error.response?.data,
      http_status: error.response?.status,
      handleError: function () {
        return handleErrorGlobally(error);
      },
    };
    return Promise.reject(responseError);
  }
);

/**
 * How to use:
    try {
      ...
    } catch (error: unknown) {
        // if we want to handle globally
        const _error = error as ApiError;
        if (_error?.handleError) {
          _error.handleError();
        }
        // or we can handle error in each api.

      }
 */

export default instance;
