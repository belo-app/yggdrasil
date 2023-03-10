import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import dayjs from "dayjs";

import { handleAxiosError, setupAxios } from "../../utils";

export interface AuthConfig {
  header: string;
  prefix: string;
}

const defaultAuthConfig: AuthConfig = {
  header: "Authorization",
  prefix: "Bearer",
};

export class JwtRestClient {
  public client: AxiosInstance;
  public authConfig: AuthConfig;
  public authToken = "";
  public expiresAt = dayjs();
  public authCache: Promise<void> | undefined;

  constructor(
    public baseUrl: string,
    authConfig?: Partial<AuthConfig>,
    clientConfig?: AxiosRequestConfig
  ) {
    this.authConfig = { ...defaultAuthConfig, ...authConfig };
    this.client = axios.create({ ...clientConfig, baseURL: this.baseUrl });

    setupAxios(this.client as any);
  }

  public setAuth(token: string, expiration: number) {
    this.authToken = token;
    this.client.defaults.headers = {
      ...this.client.defaults.headers,
      [this.authConfig.header]: `${this.authConfig.prefix} ${token}`,
    } as any;

    this.expiresAt = dayjs()
      .add(expiration, "milliseconds")
      .subtract(10, "seconds");
  }

  public async checkExpiration() {
    await this.authCache;

    const now = dayjs();
    const expired = !this.authToken || this.expiresAt.isBefore(now);

    if (expired) {
      this.authCache = this.login();
      await this.authCache;
      this.authCache = undefined;
    }
  }

  public handleError = (error) => {
    return handleAxiosError(error);
  };

  public async login(_parameters?: Record<string, any>): Promise<void> {
    return Promise.resolve();
  }

  public async get<Type = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Type> {
    await this.checkExpiration();

    return this.client
      .get<Type>(url, config)
      .then((response) => response.data)
      .catch(this.handleError);
  }

  public async post<Type = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Type> {
    await this.checkExpiration();

    return this.client
      .post<Type>(url, data, config)
      .then((response) => response.data)
      .catch(this.handleError);
  }

  public async put<Type = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Type> {
    await this.checkExpiration();

    return this.client
      .put<Type>(url, data, config)
      .then((response) => response.data)
      .catch(this.handleError);
  }

  public async patch<Type = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Type> {
    await this.checkExpiration();

    return this.client
      .patch<Type>(url, data, config)
      .then((response) => response.data)
      .catch(this.handleError);
  }

  public async delete<Type = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Type> {
    await this.checkExpiration();

    return this.client
      .delete<Type>(url, config)
      .then((response) => response.data)
      .catch(this.handleError);
  }

  public async head<Type = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Type> {
    await this.checkExpiration();

    return this.client
      .head<Type>(url, config)
      .then((response) => response.data)
      .catch(this.handleError);
  }
}
