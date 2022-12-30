"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/json-schema.ts
var _typebox = require('@sinclair/typebox');
var DateKind = Symbol("DateKind");
var BeloTypeBuilder = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, class BeloTypeBuilder2 extends _typebox.TypeBuilder {
  Optional(item) {
    if (_optionalChain([item, 'optionalAccess', _ => _[_typebox.Kind]]) == "Union") {
      return item;
    }
    return {
      ...item,
      [_typebox.Modifier]: "Optional",
      nullable: true
    };
  }
  Enum(item) {
    return {
      type: "string",
      enum: Object.keys(item)
    };
  }
  DateString() {
    return this.String();
  }
  ObjectId() {
    return this.String();
  }
}, "BeloTypeBuilder");
var Type = new BeloTypeBuilder();



exports.Type = Type;
//# sourceMappingURL=chunk-YQBDX6NY.js.map