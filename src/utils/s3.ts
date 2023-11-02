import {
  CompleteMultipartUploadOutput,
  GetObjectCommand,
  PutObjectCommandInput,
  S3,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable, Stream } from "stream";

import { logger } from "./logger";

export class S3Bucket {
  public client!: S3;

  constructor(private bucket: string, options: S3ClientConfig) {
    this.client = new S3(options);
  }

  public async getStreamFile(Key: string): Promise<Stream> {
    const result = await this.client.getObject({
      Bucket: this.bucket,
      Key,
    });
    return result.Body as Readable;
  }

  public async getJsonFile(key: string): Promise<any> {
    const result = await this.client.getObject({
      Bucket: this.bucket,
      Key: key,
    });

    const data = await result?.Body?.transformToString();

    return JSON.parse(data ?? "{}");
  }

  public async exists(key: string): Promise<any> {
    try {
      await this.client.getObject({
        Bucket: this.bucket,
        Key: key,
      });

      return true;
    } catch {
      return false;
    }
  }

  public async uploadFile(
    file: Stream | Buffer,
    filename: string,
    folder?: string,
    options?: Partial<PutObjectCommandInput>
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const Key = folder ? `${folder}/${filename}` : filename;
      const uploadData = new Upload({
        client: this.client,
        queueSize: 4,
        leavePartsOnError: false,
        params: { Bucket: this.bucket, Key, Body: file as any, ...options },
      });

      uploadData
        .done()
        .then((data: CompleteMultipartUploadOutput) => {
          resolve(data?.Location ?? "");
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async moveFile(filename: string, to: string) {
    try {
      await this.client.copyObject({
        Bucket: this.bucket,
        CopySource: this.bucket + "/" + filename,
        Key: to,
      });

      await this.client.deleteObject({
        Bucket: this.bucket,
        Key: filename,
      });
    } catch (error) {
      logger.fatal(`Move file S3 error`, { error });
    }
  }

  public getSignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.client, command);
  }

  public deleteFile(key: string, done?: (error, data) => void) {
    return (
      this.client
        .deleteObject({ Bucket: this.bucket, Key: key })
        .then((data) => done?.(undefined, data))
        // eslint-disable-next-line unicorn/no-null
        .catch((error) => done?.(error, null))
    );
  }
}
