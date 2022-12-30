"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/sftp.ts
var _ssh2sftpclient = require('ssh2-sftp-client'); var _ssh2sftpclient2 = _interopRequireDefault(_ssh2sftpclient);
var Sftp = class {
  constructor(config, name) {
    this.config = config;
    this.client = new (0, _ssh2sftpclient2.default)(name);
  }
  connect() {
    return this.client.connect(this.config);
  }
  end() {
    return this.client.end();
  }
  async listFiles(path, pattern) {
    await this.connect();
    const files = await this.client.list(path, (item) => {
      if (pattern === void 0) {
        return true;
      }
      if (typeof pattern === "string") {
        return item.name.includes(pattern);
      }
      return pattern.test(item.name);
    }).catch(async (error) => {
      await this.end();
      throw error;
    });
    await this.end();
    return files;
  }
  async exists(path) {
    await this.connect();
    const exists = await this.client.exists(path).catch(async (error) => {
      await this.end();
      throw error;
    });
    await this.end();
    return exists;
  }
  async getStreamFile(path, options) {
    await this.connect();
    const file = await this.client.get(path, void 0, options).catch(async (error) => {
      await this.end();
      throw error;
    });
    await this.end();
    return file;
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, Sftp, "Sftp");



exports.Sftp = Sftp;
//# sourceMappingURL=chunk-O44KNOCX.js.map