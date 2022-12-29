import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";

import { environment } from "./environment";
import { Log } from "./logger/pino";

class GrafanaLoki {
  public canUse = !environment.LOCAL;
  private username!: string;
  private password!: string;
  private baseUrl!: string;
  private client!: AxiosInstance;

  public constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl;
    this.username = username;
    this.password = password;

    this.client = axios.create({
      baseURL: this.baseUrl,
      auth: {
        username: this.username,
        password: this.password,
      },
    });
  }

  private handleError = (error) => {
    if (error.response) {
      return console.error(
        `Attempting to send log to Loki failed with status '${
          error.response.status
        }: ${error.response.statusText}' returned reason: ${JSON.stringify(
          error.response.data
        )}`
      );
    }

    if (error.isAxiosError === true) {
      return console.error(
        `Attempting to send log to Loki failed. Got an axios error, error code: '${error.code}' message: ${error.message}`
      );
    }

    console.error(
      "Got unknown error when trying to send log to Loki, error output:",
      error
    );
  };

  public pushLogs = async (logs: Log[]) => {
    if (!this.canUse) {
      return;
    }

    const mappedLogs = logs.map((log) => {
      return {
        stream: {
          service: log.service,
          environment: log.environment,
          level: log.level,
          hostname: log.hostname,
        },
        values: [
          [
            (dayjs(log.timestamp).toDate().getTime() * 1_000_000).toString(),
            JSON.stringify(log),
          ],
        ],
      };
    });

    await this.client
      .post("/loki/api/v1/push", { streams: mappedLogs })
      .catch((error) => this.handleError(error));
  };
}

export const grafanaLoki = new GrafanaLoki(
  environment.LOKI_HOST,
  environment.LOKI_USER,
  environment.LOKI_PASSWORD
);
