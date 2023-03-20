import { Log } from "./logger/pino";
export declare class GrafanaLoki {
    canUse: boolean;
    private username;
    private password;
    private baseUrl;
    private client;
    constructor(baseUrl: string, username: string, password: string);
    private handleError;
    pushLogs: (logs: Log[]) => Promise<void>;
}
//# sourceMappingURL=grafana-loki.d.ts.map