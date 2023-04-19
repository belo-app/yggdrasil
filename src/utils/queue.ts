import {
  DeleteMessageCommand,
  DeleteMessageCommandInput,
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
  SQSClientConfig,
} from "@aws-sdk/client-sqs";
import { Consumer, ConsumerOptions, Message } from "sqs-consumer-v3";

export class SqsClient {
  public client!: SQSClient;

  constructor(configuration: SQSClientConfig) {
    this.client = new SQSClient(configuration);
  }

  public send(data: SendMessageCommandInput) {
    const command = new SendMessageCommand(data);
    return this.client.send(command);
  }

  public delete(data: DeleteMessageCommandInput) {
    const command = new DeleteMessageCommand(data);
    return this.client.send(command);
  }
}

export async function sendMessage(
  sqsClient: SqsClient,
  queueURL: string,
  body: Record<string, any>,
  delaySeconds?: number
) {
  const parameters = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueURL,
    DelaySeconds: delaySeconds,
  };
  return sqsClient.send(parameters);
}

export function deleteMessage(
  sqsClient: SqsClient,
  queueURL: string,
  receiptHandle: string
) {
  const parameters = {
    ReceiptHandle: receiptHandle,
    QueueUrl: queueURL,
  };

  return sqsClient.delete(parameters);
}

interface Options<DataMessage = Record<string, any>>
  extends Omit<ConsumerOptions, "handleMessage"> {
  handleMessage?(message: Message & { data: DataMessage }): Promise<void>;
}

export function createConsumer<Message>(
  sqsClient: SQSClient,
  options: Partial<Options<Message>>
): Consumer {
  return Consumer.create({
    batchSize: 1,
    sqs: sqsClient,
    ...options,
    handleMessage: async (message) => {
      const data = JSON.parse(message.Body ?? "{}") as Message;
      return options.handleMessage?.({ ...message, data });
    },
  });
}
