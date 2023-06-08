import { InvokeCommandInput, Lambda, LambdaClientConfig } from "@aws-sdk/client-lambda";
export declare class LambaClient {
    client: Lambda;
    constructor(configuration: LambdaClientConfig);
}
export declare const invoke: (lamdaClient: Lambda, parameters: InvokeCommandInput) => Promise<unknown>;
//# sourceMappingURL=lambda.d.ts.map