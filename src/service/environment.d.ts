import { TokenUser } from "@belo/model";
import { MulterFile } from "@belo/utils";
import boom from "@hapi/boom";

declare module "fastify" {
  interface FastifyRequest {
    user: TokenUser;
    file?: MulterFile;
    files?: MulterFile[] | Record<string, MulterFile[]>;
  }

  interface FastifyReply {
    boom: typeof boom;
  }
}
