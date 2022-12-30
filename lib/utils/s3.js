"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicImageUrl = exports.S3Bucket = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const https_1 = __importDefault(require("https"));
const environment_1 = require("./environment");
const files_1 = require("./files");
const logger_1 = require("./logger");
const uuid_1 = require("./uuid");
aws_sdk_1.default.config.update({ region: environment_1.environment.AWS_REGION });
class S3Bucket {
    constructor(bucket) {
        this.bucket = bucket;
        this.client = new aws_sdk_1.default.S3({
            apiVersion: "2006-03-01",
            httpOptions: {
                agent: new https_1.default.Agent({
                    keepAlive: true,
                    maxSockets: 1024,
                }),
            },
        });
        this.getSignedUrl = (key) => {
            return this.client.getSignedUrl("getObject", {
                Bucket: this.bucket,
                Key: key,
            });
        };
    }
    async getStreamFile(Key) {
        return this.client
            .getObject({
            Bucket: this.bucket,
            Key,
        })
            .createReadStream();
    }
    async getJsonFile(key) {
        const data = await this.client
            .getObject({
            Bucket: this.bucket,
            Key: key,
        })
            .promise();
        return JSON.parse(data.Body?.toString() ?? "{}");
    }
    async exists(key) {
        try {
            await this.client
                .getObject({
                Bucket: this.bucket,
                Key: key,
            })
                .promise();
            return true;
        }
        catch {
            return false;
        }
    }
    async uploadFile(file, filename, folder, options) {
        const Key = folder ? `${folder}/${filename}` : filename;
        return new Promise((resolve, reject) => {
            this.client.upload({
                Bucket: this.bucket,
                Key,
                Body: file,
                ...options,
            }, (error, data) => {
                if (error) {
                    return reject(error);
                }
                resolve(data.Location);
            });
        });
    }
    async moveFile(filename, to) {
        try {
            await this.client
                .copyObject({
                Bucket: this.bucket,
                CopySource: this.bucket + "/" + filename,
                Key: to,
            })
                .promise();
            await this.client
                .deleteObject({
                Bucket: this.bucket,
                Key: filename,
            })
                .promise();
        }
        catch (error) {
            logger_1.logger.fatal(`Move file S3 error`, { error });
        }
    }
    async uploadUserFile(file, options) {
        const fileExtension = (0, files_1.getFileExtension)(file.filename) ?? "";
        const name = `${(0, uuid_1.uuid)()}.${fileExtension}`;
        const stream = file.createReadStream();
        return this.uploadFile(stream, name, undefined, {
            ContentType: file.mimetype,
            ACL: options?.isPrivate ? undefined : "public-read",
        });
    }
    deleteFile(key, done) {
        return this.client.deleteObject({ Bucket: this.bucket, Key: key }, done);
    }
}
exports.S3Bucket = S3Bucket;
const getPublicImageUrl = (name) => `https://${environment_1.environment.S3_PUBLIC_BUCKET_NAME}.s3.${environment_1.environment.AWS_REGION}.amazonaws.com/${name}`;
exports.getPublicImageUrl = getPublicImageUrl;
