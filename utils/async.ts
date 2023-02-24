import axios, { AxiosError, AxiosInstance } from "axios";
import dayjs from "dayjs";
import { cloneDeep, pick } from "lodash";

import { logger } from "./logger";
import { prometheusMetricsService } from "./metrics";
import { uuid } from "./uuid";

export function to<T, U = Error>(
  promise: Promise<T>
): Promise<[U, undefined] | [undefined, T]> {
  return promise
    .then<[undefined, T]>((data: T) => [undefined, data])
    .catch<[U, undefined]>((error: U) => {
      return [error, undefined];
    });
}

export const logAxiosError = (error: AxiosError<any>): any => {
  logger.error(`axios error ${error?.response?.data?.message ?? ""}`, {
    code: error.code,
    config: {
      ...error.config,
      data:
        typeof error.config?.data === "string"
          ? error.config?.data
          : JSON.stringify(cloneDeep(error.config?.data)),
    },
    response: pick(error.response, ["data", "status", "statusText", "headers"]),
  });
};

export const handleAxiosError = (error: AxiosError<any>): any => {
  logAxiosError(error);

  throw error;
};

const parseUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.host;
  } catch {
    return "";
  }
};

export const setupAxios = (instance: AxiosInstance) => {
  const clientApdex = 1000;

  instance.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  } as any;

  instance.interceptors.request.use(
    (config: any) => {
      config.metadata = { start: dayjs() };
      config.headers["x-belo-request-id"] = uuid();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      try {
        const elapsed = dayjs().diff(
          (response.config as any).metadata.start,
          "milliseconds"
        );

        prometheusMetricsService
          .getOrCreateHistogram("rest_client_response", {
            help: "Rest client response time",
            labelNames: ["status", "url"],
            buckets: [clientApdex, clientApdex * 4],
          })
          ?.record(elapsed, {
            status: response.status ?? "",
            url: response.config.baseURL
              ? response.config.baseURL
              : parseUrl(response.config.url ?? ""),
          });
      } catch {
        //
      }

      return response;
    },
    (error: AxiosError<any>) => {
      try {
        const elapsed = dayjs().diff(
          (error.config as any).metadata.start,
          "milliseconds"
        );

        prometheusMetricsService
          .getOrCreateHistogram("rest_client_response", {
            help: "Rest client response time",
            labelNames: ["status", "url"],
            buckets: [clientApdex, clientApdex * 4],
          })
          ?.record(elapsed, {
            status: error.response?.status ?? "",
            url: error.response?.config.baseURL
              ? error.response?.config.baseURL
              : parseUrl(error.response?.config.url ?? ""),
          });
      } catch {
        //
      }

      logAxiosError(error);

      return Promise.reject(error);
    }
  );
};

setupAxios(axios);
