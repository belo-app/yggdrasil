"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
const logger_1 = require("./logger");
const process_1 = require("./process");
mongoose_1.default.connection.on("connecting", () => {
    logger_1.logger.info("connecting to MongoDb");
});
mongoose_1.default.connection.on("error", (error) => {
    logger_1.logger.error("error in MongoDb connection", error);
});
mongoose_1.default.connection.on("connected", () => {
    logger_1.logger.info("MongoDB connected");
});
mongoose_1.default.connection.once("open", () => {
    logger_1.logger.info("MongoDB connection opened");
});
mongoose_1.default.connection.on("reconnected", () => {
    logger_1.logger.info("MongoDB reconnected");
});
mongoose_1.default.connection.on("disconnected", () => {
    logger_1.logger.info("MongoDB disconnected");
});
const disconnect = () => {
    return mongoose_1.default.disconnect().catch(() => void 0);
};
const connect = () => {
    return mongoose_1.default.connect(environment_1.environment.MONGO_DATABASE_URL);
};
const connectToMongo = async () => {
    await disconnect();
    await connect()
        .catch(() => connect())
        .catch(() => (0, process_1.exit)());
};
exports.connectToMongo = connectToMongo;
