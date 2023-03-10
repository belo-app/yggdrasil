import { InvocationRequest } from "aws-sdk/clients/lambda";
export declare const invoke: (parameters: InvocationRequest) => Promise<unknown>;
