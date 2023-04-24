import { DeleteMessageCommandInput, SendMessageCommandInput, SQSClient, SQSClientConfig } from "@aws-sdk/client-sqs";
import { Consumer, ConsumerOptions, Message } from "sqs-consumer-v3";
export declare class SqsClient {
    client: SQSClient;
    constructor(configuration: SQSClientConfig);
    send(data: SendMessageCommandInput): Promise<import("@aws-sdk/client-sqs").SendMessageCommandOutput>;
    delete(data: DeleteMessageCommandInput): Promise<import("@aws-sdk/client-sqs").DeleteMessageCommandOutput>;
}
export declare function sendMessage(sqsClient: SqsClient, queueURL: string, body: Record<string, any>, delaySeconds?: number): Promise<import("@aws-sdk/client-sqs").SendMessageCommandOutput>;
export declare function deleteMessage(sqsClient: SqsClient, queueURL: string, receiptHandle: string): Promise<import("@aws-sdk/client-sqs").DeleteMessageCommandOutput>;
interface Options<DataMessage = Record<string, any>> extends Omit<ConsumerOptions, "handleMessage"> {
    handleMessage?(message: Message & {
        data: DataMessage;
    }): Promise<void>;
}
export declare function createConsumer<Message>(sqsClient: SQSClient, options: Partial<Options<Message>>): Consumer;
export {};
//# sourceMappingURL=queue.d.ts.map