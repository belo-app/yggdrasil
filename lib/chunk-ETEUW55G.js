"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkDG7EVVMBjs = require('./chunk-DG7EVVMB.js');


var _chunkCTH5JC43js = require('./chunk-CTH5JC43.js');


var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/mongoose.ts
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
_mongoose2.default.connection.on("connecting", () => {
  _chunkCTH5JC43js.logger.info("connecting to MongoDb");
});
_mongoose2.default.connection.on("error", (error) => {
  _chunkCTH5JC43js.logger.error("error in MongoDb connection", error);
});
_mongoose2.default.connection.on("connected", () => {
  _chunkCTH5JC43js.logger.info("MongoDB connected");
});
_mongoose2.default.connection.once("open", () => {
  _chunkCTH5JC43js.logger.info("MongoDB connection opened");
});
_mongoose2.default.connection.on("reconnected", () => {
  _chunkCTH5JC43js.logger.info("MongoDB reconnected");
});
_mongoose2.default.connection.on("disconnected", () => {
  _chunkCTH5JC43js.logger.info("MongoDB disconnected");
});
var disconnect = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, () => {
  return _mongoose2.default.disconnect().catch(() => void 0);
}, "disconnect");
var connect = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, () => {
  return _mongoose2.default.connect(_chunk2RIL52B7js.environment.MONGO_DATABASE_URL);
}, "connect");
var connectToMongo = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, async () => {
  await disconnect();
  await connect().catch(() => connect()).catch(() => _chunkDG7EVVMBjs.exit.call(void 0, ));
}, "connectToMongo");



exports.connectToMongo = connectToMongo;
//# sourceMappingURL=chunk-ETEUW55G.js.map