import axios, { AxiosRequestConfig } from "axios";

const getClient = () => {
  const client = axios.create({});

  client.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      const status = [403, 404, 500];
      if (status.indexOf(error.response.status)) {
        // window.location.assign(`${window.location.origin}/#/error`);
      }

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
    return getClient()
      .get(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  delete(url: string, config?: AxiosRequestConfig | undefined) {
    return getClient()
      .delete(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  post(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return getClient()
      .post(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
  put(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    return getClient()
      .put(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
