import mongoose from "mongoose";

import { getEnvironment } from "./environment";
import { logger } from "./logger";
import { exit } from "./process";

const disconnect = () => {
  return mongoose.disconnect().catch(() => void 0);
};

const connect = (url: string) => {
  return mongoose.connect(url ?? getEnvironment("MONGO_DATABASE_URL"));
};

export const connectToMongo = async (url: string) => {
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

  await disconnect();

  await connect(url)
    .catch(() => connect(url))
    .catch(() => exit());
};
