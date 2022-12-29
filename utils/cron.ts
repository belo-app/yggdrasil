import { CronJob, CronJobParameters, CronTime } from "cron";

import { logger } from "./logger";

declare module "cron" {
  interface CronTime {
    toString: () => string;
  }

  interface CronJob {
    cronTime: CronTime;
  }
}

export interface CronJobData {
  key: string;
  options: CronJobParameters;
}

export class CronManager {
  private jobs: Record<string, CronJob> = {};

  public get(key: string) {
    return this.jobs[key];
  }

  public exists(key: string) {
    return !!this.jobs[key];
  }

  public add({ key, options }: CronJobData) {
    this.jobs[key] = new CronJob(options);
  }

  public addMany(data: CronJobData[]) {
    for (const cronData of data) {
      this.add(cronData);
    }
  }

  public delete(key) {
    if (this.exists(key)) {
      delete this.jobs[key];
    }
  }

  public updateJobTime(key: string, cronTime: string) {
    try {
      const time = new CronTime(cronTime);
      this.jobs[key]?.setTime(time);
      return true;
    } catch (error) {
      logger.error(`Could not update job time: ${key}`, { error });
    }
    return false;
  }

  public start(key: string) {
    try {
      if (!this.jobs[key]?.running) {
        this.jobs[key]?.start();
      }
      return true;
    } catch (error) {
      logger.fatal(`Cron job ${key} failed to start`, { error });
    }
    return false;
  }

  public stop(key: string) {
    try {
      if (this.jobs[key]?.running) {
        this.jobs[key]?.stop();
      }
      return true;
    } catch (error) {
      logger.fatal(`Cron job ${key} failed to stop`, { error });
    }
    return false;
  }

  public startMany(keys: string[]) {
    return keys.map((key) => this.start(key));
  }

  public stopMany(keys: string[]) {
    return keys.map((key) => this.stop(key));
  }
}
