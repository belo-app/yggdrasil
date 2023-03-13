import { Duplex, Stream } from "stream";

export const streamToBuffer = (stream: Stream): Promise<Buffer> => {
  const bufferData: any[] = [];

  stream.on("data", (data) => {
    bufferData.push(data);
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("end", () => {
      resolve(Buffer.concat(bufferData));
    });
  });
};

export const bufferToStream = (buffer: Buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  // eslint-disable-next-line unicorn/no-null
  stream.push(null);
  return stream;
};

export function getFileExtension(filename: string) {
  return filename.split(".").pop();
}
