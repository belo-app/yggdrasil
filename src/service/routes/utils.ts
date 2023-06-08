import swagger, { SwaggerOptions } from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyRequest } from "fastify";
import { File, StorageEngine } from "fastify-multer/lib/interfaces";
import openAPISnippet from "openapi-snippet";
import { Stream } from "stream";

import { environment, getFileExtension, S3Bucket, uuid } from "../../utils";
import { AppPluginCallback } from "../types";

export interface Controller {
  path: string;
  router: AppPluginCallback;
}

export interface Tag {
  name: string;
  "x-displayName": string;
  description: string;
}

const targets = [
  "shell_curl",
  "node_fetch",
  "python_requests",
  "go_native",
  "java_okhttp",
];

const httpRequestMethods = new Set([
  "get",
  "head",
  "post",
  "put",
  "delete",
  "options",
  "trace",
  "patch",
]);

const addRequestSamples = (openApiSpec) => {
  const openApi = JSON.parse(JSON.stringify(openApiSpec));

  for (const singlePath in openApi.paths) {
    for (const method of Object.keys(openApi.paths[singlePath]).filter(
      (method) => httpRequestMethods.has(method)
    )) {
      try {
        const snippets = openAPISnippet.getEndpointSnippets(
          openApi,
          singlePath,
          method,
          targets
        );
        const samples: any[] = [];

        for (const snippet of snippets.snippets) {
          samples.push({
            lang: snippet.title.split(" ")[0],
            source: snippet.content,
          });
        }
        openApi.paths[singlePath][method]["x-codeSamples"] = samples;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return openApi;
};

const openApiOptions = (tags: Tag[]): SwaggerOptions => ({
  openapi: {
    info: {
      title: "belo API docs",
      description: "belo API",
      version: "1.0.0",
      "x-logo": {
        url: "https://www.belo.app/image/referrals.jpg",
        altText: "logo",
      },
    } as any,
    tags: tags as any,
    servers: [
      {
        url: "https://api.belo.app",
        description: "Production API",
      },
      {
        url: "https://sandbox.belo.app",
        description: "Sandbox API",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

export class BaseController implements Controller {
  constructor(
    public path = "",
    private controllers: Controller[],
    private tags: Tag[] = [],
    private plugins: AppPluginCallback[] = []
  ) {}

  public router: AppPluginCallback = (instance, _, next) => {
    this.configDocs(instance, _, next);

    for (const plugin of this.plugins) {
      plugin(instance, _, next);
    }

    for (const controller of this.controllers) {
      instance.register(controller.router, { prefix: controller.path });
    }

    next();
  };

  private configDocs: AppPluginCallback = (instance) => {
    instance.addHook("preHandler", (request, response, next) => {
      if (request.url.includes("docs/static")) {
        return response.boom.notFound();
      }

      next();
    });

    instance.addHook("preSerialization", async (request, _, payload) => {
      if (request.url.includes("docs/json")) {
        console.log("boom");
        return addRequestSamples(payload);
      }

      return payload;
    });

    instance.register(swagger, openApiOptions(this.tags));

    instance.register(swaggerUi, {
      routePrefix: "/docs",
    });
  };
}

type S3File = File & { key: string; url: string };

export class MulterS3Storage implements StorageEngine {
  private client: S3Bucket;
  private acl?: string;
  private getKey?: (file: File) => string;

  constructor(options: {
    bucket: string;
    getKey?: (file: File) => string;
    acl: string;
  }) {
    this.client = new S3Bucket(options.bucket, {
      region: environment.AWS_REGION,
    });
    this.getKey = options.getKey;
  }

  private getDefaultKey = (file: File) => {
    const fileExtension = getFileExtension(file.originalname) ?? "";
    return `${uuid()}.${fileExtension}`;
  };

  _handleFile = (
    _request: FastifyRequest,
    file: File,
    done: (error?: Error | null, info?: any) => void
  ) => {
    if (!file.stream) {
      done(new Error(`Invalid file ${file.originalname}`));
    }

    const key = this.getKey?.(file) ?? this.getDefaultKey(file);

    this.client
      .uploadFile(file.stream as Stream, key, undefined, {
        ContentType: file.mimetype,
        ACL: this.acl,
      })
      .then((url: string) => {
        done(undefined, { url, key });
      })
      .catch((error) => done(error));
  };

  _removeFile = (
    _request: FastifyRequest,
    file: S3File,
    done: (error?: Error | null, info?: Partial<S3File>) => void
  ) => {
    this.client.deleteFile(file.key, done);
  };
}
