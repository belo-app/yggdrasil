import { Handler, Request, Response } from "express";
export declare const logger: import("./pino").PinoLogger;
export declare function getRequestLog(request: Request, response: Response): Record<string, any>;
export declare function loggerMiddleware(): Handler;
//# sourceMappingURL=index.d.ts.map