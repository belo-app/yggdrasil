"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/totp.ts
var _node2fa = require('node-2fa');
var Totp = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, class Totp2 {
  generateSecret(issuer, account) {
    return _node2fa.generateSecret.call(void 0, {
      name: issuer,
      account
    });
  }
  verifyToken(secret, token) {
    const verification = _node2fa.verifyToken.call(void 0, secret, token);
    return verification != void 0;
  }
  generateToken(secret) {
    const { token } = _nullishCoalesce(_node2fa.generateToken.call(void 0, secret), () => ( {}));
    return token;
  }
}, "Totp");
var totp = new Totp();



exports.totp = totp;
//# sourceMappingURL=chunk-EXSALDSA.js.map