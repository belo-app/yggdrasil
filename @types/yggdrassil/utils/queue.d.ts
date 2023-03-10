import AWS from "aws-sdk";
import { Consumer, ConsumerOptions, SQSMessage } from "sqs-consumer";
export declare const sqs: AWS.SQS;
export declare function sendMessage(queueURL: string, body: Record<string, any>): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.SQS.SendMessageResult, AWS.AWSError>>;
export declare function deleteMessage(queueURL: string, receiptHandle: string): Promise<{
    $response: AWS.Response<{}, AWS.AWSError>;
}>;
interface Options<Message = Record<string, any>> extends Omit<ConsumerOptions, "handleMessage"> {
    handleMessage?(message: SQSMessage & {
        data: Message;
    }): Promise<void>;
}
export declare function createConsumer<Message>(options: Partial<Options<Message>>): Consumer;
export {};
//# sourceMappingURL=queue.d.ts.map