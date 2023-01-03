import AWS from "aws-sdk";
import { FileUpload } from "graphql-upload";
import https from "https";
import { Stream } from "stream";

import { getFileExtension } from "./files";
import { logger } from "./logger";
import { uuid } from "./uuid";

export class S3Bucket {
  private client = new AWS.S3({
    apiVersion: "2006-03-01",
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true,
        maxSockets: 1024,
      }),
    },
  });

  constructor(private bucket: string) {}

  public async getStreamFile(Key: string): Promise<Stream> {
    return this.client
      .getObject({
        Bucket: this.bucket,
        Key,
      })
      .createReadStream();
  }

  public async getJsonFile(key: string): Promise<any> {
    const data = await this.client
      .getObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();

    return JSON.parse(data.Body?.toString() ?? "{}");
  }

  public async exists(key: string): Promise<any> {
    try {
      await this.client
        .getObject({
          Bucket: this.bucket,
          Key: key,
        })
        .promise();

      return true;
    } catch {
      return false;
    }
  }

  public async uploadFile(
    file: Stream | Buffer,
    filename: string,
    folder?: string,
    options?: Partial<AWS.S3.PutObjectRequest>
  ): Promise<string> {
    const Key = folder ? `${folder}/${filename}` : filename;
    return new Promise((resolve, reject) => {
      this.client.upload(
        {
          Bucket: this.bucket,
          Key,
          Body: file,
          ...options,
        },
        (error, data) => {
          if (error) {
            return reject(error);
          }
          resolve(data.Location);
        }
      );
    });
  }

  public async moveFile(filename: string, to: string) {
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
    } catch (error) {
      logger.fatal(`Move file S3 error`, { error });
    }
  }

  public async uploadUserFile(
    file: FileUpload,
    options?: { isPrivate: boolean }
  ): Promise<string> {
    const fileExtension = getFileExtension(file.filename) ?? "";
    const name = `${uuid()}.${fileExtension}`;
    const stream = file.createReadStream();

    return this.uploadFile(stream, name, undefined, {
      ContentType: file.mimetype,
      ACL: options?.isPrivate ? undefined : "public-read",
    });
  }

  public getSignedUrl = (key: string) => {
    return this.client.getSignedUrl("getObject", {
      Bucket: this.bucket,
      Key: key,
    });
  };

  public deleteFile(key: string, done?: (error, data) => void) {
    return this.client.deleteObject({ Bucket: this.bucket, Key: key }, done);
  }
}
