"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sftp = void 0;
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
class Sftp {
    constructor(config, name) {
        this.config = config;
        this.client = new ssh2_sftp_client_1.default(name);
    }
    connect() {
        return this.client.connect(this.config);
    }
    end() {
        return this.client.end();
    }
    async listFiles(path, pattern) {
        await this.connect();
        const files = await this.client
            /*    // @ts-expect-error: Breaking change in version 9.x */
            .list(path, (item) => {
            if (pattern === undefined) {
                return true;
            }
            if (typeof pattern === "string") {
                return item.name.includes(pattern);
            }
            return pattern.test(item.name);
        })
            .catch(async (error) => {
            await this.end();
            throw error;
        });
        await this.end();
        return files;
    }
    async exists(path) {
        await this.connect();
        const exists = await this.client.exists(path).catch(async (error) => {
            await this.end();
            throw error;
        });
        await this.end();
        return exists;
    }
    async getStreamFile(path, options) {
        await this.connect();
        const file = await this.client
            .get(path, undefined, options)
            .catch(async (error) => {
            await this.end();
            throw error;
        });
        await this.end();
        return file;
    }
}
exports.Sftp = Sftp;
