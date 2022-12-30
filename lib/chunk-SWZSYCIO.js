"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkUMTY7FHDjs = require('./chunk-UMTY7FHD.js');


var _chunkJKO3S2VDjs = require('./chunk-JKO3S2VD.js');


var _chunkCTH5JC43js = require('./chunk-CTH5JC43.js');


var _chunk2RIL52B7js = require('./chunk-2RIL52B7.js');


var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/s3.ts
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);
var _https = require('https'); var _https2 = _interopRequireDefault(_https);
_awssdk2.default.config.update({
  region: _chunk2RIL52B7js.environment.AWS_REGION
});
var S3Bucket = class {
  constructor(bucket) {
    this.bucket = bucket;
    this.client = new _awssdk2.default.S3({
      apiVersion: "2006-03-01",
      httpOptions: {
        agent: new _https2.default.Agent({
          keepAlive: true,
          maxSockets: 1024
        })
      }
    });
    this.getSignedUrl = (key) => {
      return this.client.getSignedUrl("getObject", {
        Bucket: this.bucket,
        Key: key
      });
    };
  }
  async getStreamFile(Key) {
    return this.client.getObject({
      Bucket: this.bucket,
      Key
    }).createReadStream();
  }
  async getJsonFile(key) {
    const data = await this.client.getObject({
      Bucket: this.bucket,
      Key: key
    }).promise();
    return JSON.parse(_nullishCoalesce(_optionalChain([data, 'access', _ => _.Body, 'optionalAccess', _2 => _2.toString, 'call', _3 => _3()]), () => ( "{}")));
  }
  async exists(key) {
    try {
      await this.client.getObject({
        Bucket: this.bucket,
        Key: key
      }).promise();
      return true;
    } catch (e) {
      return false;
    }
  }
  async uploadFile(file, filename, folder, options) {
    const Key = folder ? `${folder}/${filename}` : filename;
    return new Promise((resolve, reject) => {
      this.client.upload({
        Bucket: this.bucket,
        Key,
        Body: file,
        ...options
      }, (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data.Location);
      });
    });
  }
  async moveFile(filename, to) {
    try {
      await this.client.copyObject({
        Bucket: this.bucket,
        CopySource: this.bucket + "/" + filename,
        Key: to
      }).promise();
      await this.client.deleteObject({
        Bucket: this.bucket,
        Key: filename
      }).promise();
    } catch (error) {
      _chunkCTH5JC43js.logger.fatal(`Move file S3 error`, {
        error
      });
    }
  }
  async uploadUserFile(file, options) {
    const fileExtension = _nullishCoalesce(_chunkUMTY7FHDjs.getFileExtension.call(void 0, file.filename), () => ( ""));
    const name = `${_chunkJKO3S2VDjs.uuid.call(void 0, )}.${fileExtension}`;
    const stream = file.createReadStream();
    return this.uploadFile(stream, name, void 0, {
      ContentType: file.mimetype,
      ACL: _optionalChain([options, 'optionalAccess', _4 => _4.isPrivate]) ? void 0 : "public-read"
    });
  }
  deleteFile(key, done) {
    return this.client.deleteObject({
      Bucket: this.bucket,
      Key: key
    }, done);
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, S3Bucket, "S3Bucket");
var getPublicImageUrl = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, (name) => `https://${_chunk2RIL52B7js.environment.S3_PUBLIC_BUCKET_NAME}.s3.${_chunk2RIL52B7js.environment.AWS_REGION}.amazonaws.com/${name}`, "getPublicImageUrl");




exports.S3Bucket = S3Bucket; exports.getPublicImageUrl = getPublicImageUrl;
//# sourceMappingURL=chunk-SWZSYCIO.js.map