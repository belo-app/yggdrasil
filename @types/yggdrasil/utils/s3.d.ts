/// <reference types="node" />
/// <reference types="node" />
import AWS from "aws-sdk";
import { Stream } from "stream";
export declare class S3Bucket {
    private bucket;
    private client;
    constructor(bucket: string);
    getStreamFile(Key: string): Promise<Stream>;
    getJsonFile(key: string): Promise<any>;
    exists(key: string): Promise<any>;
    uploadFile(file: Stream | Buffer, filename: string, folder?: string, options?: Partial<AWS.S3.PutObjectRequest>): Promise<string>;
    moveFile(filename: string, to: string): Promise<void>;
    getSignedUrl: (key: string) => string;
    deleteFile(key: string, done?: (error: any, data: any) => void): AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>;
}
//# sourceMappingURL=s3.d.ts.map