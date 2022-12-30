"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _class;

var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/grafana-loki.ts
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var GrafanaLoki = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0,  (_class =class GrafanaLoki2 {
  __init() {this.canUse = !_chunk2RIL52B7js.environment.LOCAL}
  constructor(baseUrl, username, password) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
    this.baseUrl = baseUrl;
    this.username = username;
    this.password = password;
    this.client = _axios2.default.create({
      baseURL: this.baseUrl,
      auth: {
        username: this.username,
        password: this.password
      }
    });
  }
  __init2() {this.handleError = (error) => {
    if (error.response) {
      return console.error(`Attempting to send log to Loki failed with status '${error.response.status}: ${error.response.statusText}' returned reason: ${JSON.stringify(error.response.data)}`);
    }
    if (error.isAxiosError === true) {
      return console.error(`Attempting to send log to Loki failed. Got an axios error, error code: '${error.code}' message: ${error.message}`);
    }
    console.error("Got unknown error when trying to send log to Loki, error output:", error);
  }}
  __init3() {this.pushLogs = async (logs) => {
    if (!this.canUse) {
      return;
    }
    const mappedLogs = logs.map((log) => {
      return {
        stream: {
          service: log.service,
          environment: log.environment,
          level: log.level,
          hostname: log.hostname
        },
        values: [
          [
            (_dayjs2.default.call(void 0, log.timestamp).toDate().getTime() * 1e6).toString(),
            JSON.stringify(log)
          ]
        ]
      };
    });
    await this.client.post("/loki/api/v1/push", {
      streams: mappedLogs
    }).catch((error) => this.handleError(error));
  }}
}, _class), "GrafanaLoki");
var grafanaLoki = new GrafanaLoki(_chunk2RIL52B7js.environment.LOKI_HOST, _chunk2RIL52B7js.environment.LOKI_USER, _chunk2RIL52B7js.environment.LOKI_PASSWORD);



exports.grafanaLoki = grafanaLoki;
//# sourceMappingURL=chunk-DAO6HSI2.js.map