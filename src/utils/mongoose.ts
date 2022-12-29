import mongoose from "mongoose";

import { environment } from "./environment";
import { logger } from "./logger";
import { exit } from "./process";

mongoose.connection.on("connecting", () => {
  logger.info("connecting to MongoDb");
});

mongoose.connection.on("error", (error) => {
  logger.error("error in MongoDb connection", error);
});

mongoose.connection.on("connected", () => {
  logger.info("MongoDB connected");
});

mongoose.connection.once("open", () => {
  logger.info("MongoDB connection opened");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

mongoose.connection.on("disconnected", () => {
  logger.info("MongoDB disconnected");
});

const disconnect = () => {
  return mongoose.disconnect().catch(() => void 0);
};

const connect = () => {
  return mongoose.connect(environment.MONGO_DATABASE_URL);
};

export const connectToMongo = async () => {
  await disconnect();

  await connect()
    .catch(() => connect())
    .catch(() => exit());
};
