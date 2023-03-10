import { Consumer, ConsumerOptions, SQSMessage } from "sqs-consumer";
export declare const sqs: any;
export declare function sendMessage(queueURL: string, body: Record<string, any>): Promise<any>;
export declare function deleteMessage(queueURL: string, receiptHandle: string): any;
interface Options<Message = Record<string, any>> extends Omit<ConsumerOptions, "handleMessage"> {
    handleMessage?(message: SQSMessage & {
        data: Message;
    }): Promise<void>;
}
export declare function createConsumer<Message>(options: Partial<Options<Message>>): Consumer;
export {};
