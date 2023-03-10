import { Counter, CounterConfiguration, Histogram, HistogramConfiguration } from "prom-client";
declare class PrometheusMetricService {
    private client?;
    private metrics;
    private service;
    private canUse;
    constructor();
    setUpServer(): void;
    setService(service: string): void;
    getEnvironmentAttributes: any;
    getOrCreateHistogram(name: string, options: Omit<HistogramConfiguration<string>, "name">): (Histogram & {
        record: (value: number, attributes: Record<string, any>) => void;
    }) | undefined;
    getOrCreateCounter(name: string, options: Omit<CounterConfiguration<string>, "name">): (Counter & {
        record: (value: number, attributes: Record<string, any>) => void;
    }) | undefined;
}
export declare const prometheusMetricsService: PrometheusMetricService;
export {};
