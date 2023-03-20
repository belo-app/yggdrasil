import { AxiosError, AxiosInstance } from "axios";
export declare function to<T, U = Error>(promise: Promise<T>): Promise<[U, undefined] | [undefined, T]>;
export declare const logAxiosError: (error: AxiosError<any>) => any;
export declare const handleAxiosError: (error: AxiosError<any>) => any;
export declare const setupAxios: (instance: AxiosInstance) => void;
//# sourceMappingURL=async.d.ts.map