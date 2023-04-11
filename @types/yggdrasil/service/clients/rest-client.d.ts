import { AxiosInstance, AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
export interface AuthConfig {
    header: string;
    prefix: string;
}
export declare class JwtRestClient {
    baseUrl: string;
    client: AxiosInstance;
    authConfig: AuthConfig;
    authToken: string;
    expiresAt: dayjs.Dayjs;
    authCache: Promise<void> | undefined;
    constructor(baseUrl: string, authConfig?: Partial<AuthConfig>, clientConfig?: AxiosRequestConfig);
    setAuth(token: string, expiration: number): void;
    checkExpiration(): Promise<void>;
    handleError: (error: any) => any;
    login(_parameters?: Record<string, any>): Promise<void>;
    get<Type = any>(url: string, config?: AxiosRequestConfig): Promise<Type>;
    post<Type = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Type>;
    put<Type = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Type>;
    patch<Type = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Type>;
    delete<Type = any>(url: string, config?: AxiosRequestConfig): Promise<Type>;
    head<Type = any>(url: string, config?: AxiosRequestConfig): Promise<Type>;
}
//# sourceMappingURL=rest-client.d.ts.map