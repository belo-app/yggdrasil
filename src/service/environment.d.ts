import boom from "@hapi/boom";

import { MulterFile } from "../utils";

declare module "fastify" {
  interface FastifyRequest {
    file?: MulterFile;
    files?: MulterFile[] | Record<string, MulterFile[]>;
  }

  interface FastifyReply {
    boom: typeof boom;
  }
}
