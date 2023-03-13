import { Logger } from "./logger";
export interface Log {
    service: string;
    release: string;
    environment: string;
    message: string;
    timestamp: string;
    hostname: string;
    ip: string;
    level: string;
    metadata?: string;
    trace_id?: string;
    span_id?: string;
    trace_flags?: string;
}
export declare class PinoLogger extends Logger {
    release: string;
    environment: string;
    service: string;
    private EVENT;
    private queue;
    instance: any;
    constructor(release?: string, environment?: string, service?: string);
    info(message: string, data?: Record<string, any>): void;
    error(message: string, data?: Record<string, any>): void;
    fatal(message: string, data?: Record<string, any>): void;
    warn(message: string, data?: Record<string, any>): void;
    listenLogs(callback: (logs: Log[]) => void): void;
}
export declare const pinoLogger: PinoLogger;
//# sourceMappingURL=pino.d.ts.map