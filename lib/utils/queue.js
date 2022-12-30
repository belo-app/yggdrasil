"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsumer = exports.deleteMessage = exports.sendMessage = exports.sqs = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const https_1 = __importDefault(require("https"));
const sqs_consumer_1 = require("sqs-consumer");
exports.sqs = new aws_sdk_1.default.SQS({
    httpOptions: {
        agent: new https_1.default.Agent({
            keepAlive: true,
            maxSockets: 1024,
        }),
    },
});
async function sendMessage(queueURL, body) {
    const parameters = {
        MessageBody: JSON.stringify(body),
        QueueUrl: queueURL,
    };
    return exports.sqs.sendMessage(parameters).promise();
}
exports.sendMessage = sendMessage;
function deleteMessage(queueURL, receiptHandle) {
    const parameters = {
        ReceiptHandle: receiptHandle,
        QueueUrl: queueURL,
    };
    return exports.sqs.deleteMessage(parameters).promise();
}
exports.deleteMessage = deleteMessage;
function createConsumer(options) {
    return sqs_consumer_1.Consumer.create({
        batchSize: 1,
        sqs: exports.sqs,
        ...options,
        handleMessage: async (message) => {
            const data = JSON.parse(message.Body ?? "{}");
            return options.handleMessage?.({ ...message, data });
        },
    });
}
exports.createConsumer = createConsumer;
