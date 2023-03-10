import memoize from "memoizee";
import { Counter, CounterConfiguration, Histogram, HistogramConfiguration } from "prom-client";
declare class PrometheusMetricService {
    private client?;
    private metrics;
    private service;
    private canUse;
    constructor();
    setUpServer(): void;
    setService(service: string): void;
    getEnvironmentAttributes: ((attributes?: Record<string, string>) => {
        hostname: string;
        environment: string;
        service: string;
    }) & memoize.Memoized<(attributes?: Record<string, string>) => {
        hostname: string;
        environment: string;
        service: string;
    }>;
    getOrCreateHistogram(name: string, options: Omit<HistogramConfiguration<string>, "name">): (Histogram & {
        record: (value: number, attributes: Record<string, any>) => void;
    }) | undefined;
    getOrCreateCounter(name: string, options: Omit<CounterConfiguration<string>, "name">): (Counter & {
        record: (value: number, attributes: Record<string, any>) => void;
    }) | undefined;
}
export declare const prometheusMetricsService: PrometheusMetricService;
export {};
//# sourceMappingURL=metrics.d.ts.map