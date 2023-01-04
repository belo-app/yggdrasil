import AWS from "aws-sdk";
import https from "https";
import { Consumer, ConsumerOptions, SQSMessage } from "sqs-consumer";

export const sqs = new AWS.SQS({
  httpOptions: {
    agent: new https.Agent({
      keepAlive: true,
      maxSockets: 1024,
    }),
  },
});

export async function sendMessage(queueURL: string, body: Record<string, any>) {
  const parameters = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueURL,
  };

  return sqs.sendMessage(parameters).promise();
}

export function deleteMessage(queueURL: string, receiptHandle: string) {
  const parameters = {
    ReceiptHandle: receiptHandle,
    QueueUrl: queueURL,
  };

  return sqs.deleteMessage(parameters).promise();
}

interface Options<Message = Record<string, any>>
  extends Omit<ConsumerOptions, "handleMessage"> {
  handleMessage?(message: SQSMessage & { data: Message }): Promise<void>;
}

export function createConsumer<Message>(
  options: Partial<Options<Message>>
): Consumer {
  return Consumer.create({
    batchSize: 1,
    sqs,
    ...options,
    handleMessage: async (message) => {
      const data = JSON.parse(message.Body ?? "{}") as Message;
      return options.handleMessage?.({ ...message, data });
    },
  });
}
