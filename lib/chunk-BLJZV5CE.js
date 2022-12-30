"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/provider-resolver.ts
var _memoizee = require('memoizee'); var _memoizee2 = _interopRequireDefault(_memoizee);
var ProviderResolver = class {
  constructor(base, providerClassMap) {
    this.base = base;
    this.providerClassMap = providerClassMap;
    this.getInstances = _memoizee2.default.call(void 0, () => {
      let instances = {};
      for (const [key, clazz] of Object.entries(this.providerClassMap())) {
        if (!clazz) {
          continue;
        }
        instances = {
          ...instances,
          [key]: new clazz()
        };
      }
      const defaultInstance = new this.base();
      instances.default = defaultInstance;
      return instances;
    });
  }
  resolveByType(type) {
    const instances = this.getInstances();
    return _nullishCoalesce(instances[type], () => ( instances.default));
  }
};
_chunkTUYBEZEZjs.__name.call(void 0, ProviderResolver, "ProviderResolver");



exports.ProviderResolver = ProviderResolver;
//# sourceMappingURL=chunk-BLJZV5CE.js.map