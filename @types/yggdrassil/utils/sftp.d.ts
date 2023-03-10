/// <reference types="node" />
import sftp from "ssh2-sftp-client";
export declare class Sftp {
    private config;
    private client;
    constructor(config: sftp.ConnectOptions, name?: string);
    private connect;
    private end;
    listFiles(path: string, pattern?: string | RegExp): Promise<sftp.FileInfo[]>;
    exists(path: string): Promise<any>;
    getStreamFile(path: string, options?: sftp.TransferOptions): Promise<Buffer>;
}
//# sourceMappingURL=sftp.d.ts.map