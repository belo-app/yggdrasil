import sftp, { FileInfo } from "ssh2-sftp-client";

export class Sftp {
  private client: sftp;

  constructor(private config: sftp.ConnectOptions, name?: string) {
    this.client = new sftp(name);
  }

  private connect() {
    return this.client.connect(this.config);
  }

  private end() {
    return this.client.end();
  }

  public async listFiles(
    path: string,
    pattern?: string | RegExp
  ): Promise<sftp.FileInfo[]> {
    await this.connect();

    const files = await this.client
      // @ts-expect-error: Breaking change in version 9.x
      .list(path, (item: FileInfo) => {
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

  public async exists(path: string) {
    await this.connect();

    const exists = await this.client.exists(path).catch(async (error) => {
      await this.end();
      throw error;
    });

    await this.end();

    return exists;
  }

  public async getStreamFile(
    path: string,
    options?: sftp.TransferOptions
  ): Promise<Buffer> {
    await this.connect();

    const file = await this.client
      .get(path, undefined, options)
      .catch(async (error) => {
        await this.end();
        throw error;
      });

    await this.end();
    return file as Buffer;
  }
}
