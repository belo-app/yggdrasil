import {
  InvokeCommandInput,
  Lambda,
  LambdaClientConfig,
} from "@aws-sdk/client-lambda";

export class LambaClient {
  public client!: Lambda;

  constructor(configuration: LambdaClientConfig) {
    this.client = new Lambda(configuration);
  }
}

export const invoke = (lamdaClient: Lambda, parameters: InvokeCommandInput) => {
  return new Promise((resolve, reject) => {
    lamdaClient.invoke(parameters, function (error, data) {
      if (error) {
        return reject(error);
      }
      try {
        const result = Buffer.from(data?.Payload ?? "").toString();
        resolve(JSON.parse(result));
      } catch {
        resolve(data?.Payload);
      }
    });
  });
};
