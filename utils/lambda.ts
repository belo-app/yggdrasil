import AWS from "aws-sdk";
import { InvocationRequest } from "aws-sdk/clients/lambda";
import https from "https";

const lambda = new AWS.Lambda({
  apiVersion: "2015-03-31",
  httpOptions: {
    agent: new https.Agent({
      keepAlive: true,
      maxSockets: 1024,
    }),
  },
});

export const invoke = (parameters: InvocationRequest) => {
  return new Promise((resolve, reject) => {
    lambda.invoke(parameters, function (error, data) {
      if (error) {
        return reject(error);
      }
      try {
        const result = JSON.parse(data?.Payload as string);
        resolve(result);
      } catch {
        resolve(data?.Payload);
      }
    });
  });
};
