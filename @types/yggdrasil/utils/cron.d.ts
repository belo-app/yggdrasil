import { CronJob, CronJobParameters } from "cron";
export interface CronJobData {
    key: string;
    options: CronJobParameters;
}
export declare class CronManager {
    private jobs;
    get(key: string): CronJob | undefined;
    exists(key: string): boolean;
    add({ key, options }: CronJobData): void;
    addMany(data: CronJobData[]): void;
    delete(key: any): void;
    updateJobTime(key: string, cronTime: string): boolean;
    start(key: string): boolean;
    stop(key: string): boolean;
    startMany(keys: string[]): boolean[];
    stopMany(keys: string[]): boolean[];
}
//# sourceMappingURL=cron.d.ts.map