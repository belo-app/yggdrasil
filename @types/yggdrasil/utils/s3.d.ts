/// <reference types="node" />
/// <reference types="node" />
import { PutObjectCommandInput, S3, S3ClientConfig } from "@aws-sdk/client-s3";
import { Stream } from "stream";
export declare class S3Bucket {
    private bucket;
    client: S3;
    constructor(bucket: string, options: S3ClientConfig);
    getStreamFile(Key: string): Promise<Stream>;
    getJsonFile(key: string): Promise<any>;
    exists(key: string): Promise<any>;
    uploadFile(file: Stream | Buffer, filename: string, folder?: string, options?: Partial<PutObjectCommandInput>): Promise<string>;
    moveFile(filename: string, to: string): Promise<void>;
    getSignedUrl(key: string): Promise<string>;
    deleteFile(key: string, done?: (error: any, data: any) => void): Promise<void | undefined>;
}
//# sourceMappingURL=s3.d.ts.map