"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _class;

var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/bigquery.ts
var _bigquery = require('@google-cloud/bigquery');
var _memoizee = require('memoizee'); var _memoizee2 = _interopRequireDefault(_memoizee);
var BigQueryClient = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0,  (_class =class BigQueryClient2 {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this); }
  __init() {this.canUse = !_chunk2RIL52B7js.environment.LOCAL && _chunk2RIL52B7js.environment.BIGQUERY_CREDENTIALS}
  __init2() {this.get = _memoizee2.default.call(void 0, () => {
    if (!this.canUse) {
      return;
    }
    try {
      const credentials = JSON.parse(_chunk2RIL52B7js.environment.BIGQUERY_CREDENTIALS);
      return new (0, _bigquery.BigQuery)({
        projectId: "belo-8310",
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key
        }
      });
    } catch (e2) {
    }
  })}
}, _class), "BigQueryClient");
var bigQuery = new BigQueryClient();



exports.bigQuery = bigQuery;
//# sourceMappingURL=chunk-ZMNV2GWS.js.map