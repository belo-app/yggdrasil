"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/queue.ts
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);
var _https = require('https'); var _https2 = _interopRequireDefault(_https);
var _sqsconsumer = require('sqs-consumer');
var sqs = new _awssdk2.default.SQS({
  httpOptions: {
    agent: new _https2.default.Agent({
      keepAlive: true,
      maxSockets: 1024
    })
  }
});
async function sendMessage(queueURL, body) {
  const parameters = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueURL
  };
  return sqs.sendMessage(parameters).promise();
}
_chunkTUYBEZEZjs.__name.call(void 0, sendMessage, "sendMessage");
function deleteMessage(queueURL, receiptHandle) {
  const parameters = {
    ReceiptHandle: receiptHandle,
    QueueUrl: queueURL
  };
  return sqs.deleteMessage(parameters).promise();
}
_chunkTUYBEZEZjs.__name.call(void 0, deleteMessage, "deleteMessage");
function createConsumer(options) {
  return _sqsconsumer.Consumer.create({
    batchSize: 1,
    sqs,
    ...options,
    handleMessage: async (message) => {
      const data = JSON.parse(_nullishCoalesce(message.Body, () => ( "{}")));
      return _optionalChain([options, 'access', _ => _.handleMessage, 'optionalCall', _2 => _2({
        ...message,
        data
      })]);
    }
  });
}
_chunkTUYBEZEZjs.__name.call(void 0, createConsumer, "createConsumer");






exports.sqs = sqs; exports.sendMessage = sendMessage; exports.deleteMessage = deleteMessage; exports.createConsumer = createConsumer;
//# sourceMappingURL=chunk-JAORXZ4L.js.map