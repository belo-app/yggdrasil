export type LoggerFunction = (message: string, data?: Record<string, any>) => void;
export declare class Logger {
    release: string;
    environment: string;
    service: string;
    emitter: any;
    constructor(release?: string, environment?: string, service?: string);
    setService: (service: string) => void;
    protected getData(data?: Record<string, any>): any;
    info(message: string, data?: Record<string, any>): void;
    error(message: string, data?: Record<string, any>): void;
    fatal(message: string, data?: Record<string, any>): void;
    warn(message: string, data?: Record<string, any>): void;
}
