import axios, { AxiosRequestConfig } from "axios";

const getClient = () => {
  const client = axios.create({});

  client.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Base HTTP Client
 */
export default {
  get(url: string, config?: AxiosRequestConfig | undefined) {
    return getClient().get(url, config);
  },
  delete(url: string, config?: AxiosRequestConfig | undefined) {
    return getClient().delete(url, config);
  },
  post(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return getClient().post(url, data, config);
  },
  put(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return getClient().put(url, data, config);
  },
};
