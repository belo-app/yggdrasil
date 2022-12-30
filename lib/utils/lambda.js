"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoke = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const https_1 = __importDefault(require("https"));
const lambda = new aws_sdk_1.default.Lambda({
    apiVersion: "2015-03-31",
    httpOptions: {
        agent: new https_1.default.Agent({
            keepAlive: true,
            maxSockets: 1024,
        }),
    },
});
const invoke = (parameters) => {
    return new Promise((resolve, reject) => {
        lambda.invoke(parameters, function (error, data) {
            if (error) {
                return reject(error);
            }
            try {
                const result = JSON.parse(data?.Payload);
                resolve(result);
            }
            catch {
                resolve(data?.Payload);
            }
        });
    });
};
exports.invoke = invoke;
