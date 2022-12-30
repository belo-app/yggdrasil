"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronManager = void 0;
const cron_1 = require("cron");
const logger_1 = require("./logger");
class CronManager {
    constructor() {
        this.jobs = {};
    }
    get(key) {
        return this.jobs[key];
    }
    exists(key) {
        return !!this.jobs[key];
    }
    add({ key, options }) {
        this.jobs[key] = new cron_1.CronJob(options);
    }
    addMany(data) {
        for (const cronData of data) {
            this.add(cronData);
        }
    }
    delete(key) {
        if (this.exists(key)) {
            delete this.jobs[key];
        }
    }
    updateJobTime(key, cronTime) {
        try {
            const time = new cron_1.CronTime(cronTime);
            this.jobs[key]?.setTime(time);
            return true;
        }
        catch (error) {
            logger_1.logger.error(`Could not update job time: ${key}`, { error });
        }
        return false;
    }
    start(key) {
        try {
            if (!this.jobs[key]?.running) {
                this.jobs[key]?.start();
            }
            return true;
        }
        catch (error) {
            logger_1.logger.fatal(`Cron job ${key} failed to start`, { error });
        }
        return false;
    }
    stop(key) {
        try {
            if (this.jobs[key]?.running) {
                this.jobs[key]?.stop();
            }
            return true;
        }
        catch (error) {
            logger_1.logger.fatal(`Cron job ${key} failed to stop`, { error });
        }
        return false;
    }
    startMany(keys) {
        return keys.map((key) => this.start(key));
    }
    stopMany(keys) {
        return keys.map((key) => this.stop(key));
    }
}
exports.CronManager = CronManager;
