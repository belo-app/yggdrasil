import Knex, { Knex as KnexType } from "knex";
import { knexSnakeCaseMappers, Model } from "objection";

import { environment } from "./environment";
import { connectToMongo } from "./mongoose";

export interface DatabaseConfig {
  pool: {
    min: number;
    max: number;
  };
}

let knexInstance!: KnexType;
let knexReadInstance!: KnexType;
let knex!: KnexType;
let knexRead!: KnexType;

export const setupDatabase = async (config: Partial<DatabaseConfig> = {}) => {
  knexInstance = Knex({
    client: "postgresql",

    pool: {
      min: config.pool?.min ?? 0,
      max: config.pool?.min ?? 5,

      createTimeoutMillis: 30_000,
      acquireTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },

    useNullAsDefault: true,

    connection: environment.DATABASE_URL,

    ...knexSnakeCaseMappers(),
  });

  knexReadInstance = Knex({
    client: "postgresql",

    pool: {
      min: config.pool?.min ?? 0,
      max: config.pool?.min ?? 5,

      createTimeoutMillis: 30_000,
      acquireTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },

    useNullAsDefault: true,

    connection: environment.DATABASE_READ_REPLICA_URL,

    ...knexSnakeCaseMappers(),
  });

  knex = knexInstance;
  knexRead = knexReadInstance;

  Model.knex(knex);
  await connectToMongo();
};

/* setupDatabase(); */

if (environment.TEST) {
  knex = new Proxy(
    function () {
      return void 0;
    } as any,
    {
      get(_target, property) {
        const handler = knexInstance[property];

        return typeof handler === "function"
          ? handler.bind(knexInstance)
          : handler;
      },
      apply(_target, _thisArgument, argumentsList) {
        return knexInstance(...argumentsList);
      },
    }
  ) as KnexType;
}

export { knex, knexRead };
