export declare class Opentelemetry {
    private sdk?;
    constructor(resourceName: string, traceExporterUrl: string);
    start(): Promise<void>;
}
