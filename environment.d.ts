import "./service/environment.d.ts";

declare module "cron" {
  interface CronTime {
    toString: () => string;
  }

  interface CronJob {
    cronTime: CronTime;
  }
}
