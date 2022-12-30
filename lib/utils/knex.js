"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexRead = exports.knex = exports.setupDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const environment_1 = require("./environment");
const mongoose_1 = require("./mongoose");
let knexInstance;
let knexReadInstance;
let knex;
exports.knex = knex;
let knexRead;
exports.knexRead = knexRead;
const setupDatabase = async (config = {}) => {
    knexInstance = (0, knex_1.default)({
        client: "postgresql",
        pool: {
            min: config.pool?.min ?? 0,
            max: config.pool?.min ?? 5,
            createTimeoutMillis: 30000,
            acquireTimeoutMillis: 10000,
            idleTimeoutMillis: 30000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100,
        },
        useNullAsDefault: true,
        connection: environment_1.environment.DATABASE_URL,
        ...(0, objection_1.knexSnakeCaseMappers)(),
    });
    knexReadInstance = (0, knex_1.default)({
        client: "postgresql",
        pool: {
            min: config.pool?.min ?? 0,
            max: config.pool?.min ?? 5,
            createTimeoutMillis: 30000,
            acquireTimeoutMillis: 10000,
            idleTimeoutMillis: 30000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100,
        },
        useNullAsDefault: true,
        connection: environment_1.environment.DATABASE_READ_REPLICA_URL,
        ...(0, objection_1.knexSnakeCaseMappers)(),
    });
    exports.knex = knex = knexInstance;
    exports.knexRead = knexRead = knexReadInstance;
    objection_1.Model.knex(knex);
    await (0, mongoose_1.connectToMongo)();
};
exports.setupDatabase = setupDatabase;
(0, exports.setupDatabase)();
if (environment_1.environment.TEST) {
    exports.knex = knex = new Proxy(function () {
        return void 0;
    }, {
        get(_target, property) {
            const handler = knexInstance[property];
            return typeof handler === "function"
                ? handler.bind(knexInstance)
                : handler;
        },
        apply(_target, _thisArgument, argumentsList) {
            return knexInstance(...argumentsList);
        },
    });
}
