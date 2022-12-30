"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkETEUW55Gjs = require('../chunk-ETEUW55G.js');
require('../chunk-DG7EVVMB.js');
require('../chunk-CTH5JC43.js');
require('../chunk-EYS4YZCX.js');
require('../chunk-5Y74JCVK.js');
require('../chunk-DQSECEBN.js');
require('../chunk-DAO6HSI2.js');
require('../chunk-ZMNV2GWS.js');


var _chunk2RIL52B7js = require('../chunk-2RIL52B7.js');
require('../chunk-QZ6BCM35.js');


var _chunkTUYBEZEZjs = require('../chunk-TUYBEZEZ.js');

// src/utils/knex.ts
var _knex = require('knex'); var _knex2 = _interopRequireDefault(_knex);
var _objection = require('objection');
var knexInstance;
var knexReadInstance;
var knex;
var knexRead;
var setupDatabase = /* @__PURE__ */ _chunkTUYBEZEZjs.__name.call(void 0, async (config = {}) => {
  knexInstance = _knex2.default.call(void 0, {
    client: "postgresql",
    pool: {
      min: _nullishCoalesce(_optionalChain([config, 'access', _ => _.pool, 'optionalAccess', _2 => _2.min]), () => ( 0)),
      max: _nullishCoalesce(_optionalChain([config, 'access', _3 => _3.pool, 'optionalAccess', _4 => _4.min]), () => ( 5)),
      createTimeoutMillis: 3e4,
      acquireTimeoutMillis: 1e4,
      idleTimeoutMillis: 3e4,
      reapIntervalMillis: 1e3,
      createRetryIntervalMillis: 100
    },
    useNullAsDefault: true,
    connection: _chunk2RIL52B7js.environment.DATABASE_URL,
    ..._objection.knexSnakeCaseMappers.call(void 0, )
  });
  knexReadInstance = _knex2.default.call(void 0, {
    client: "postgresql",
    pool: {
      min: _nullishCoalesce(_optionalChain([config, 'access', _5 => _5.pool, 'optionalAccess', _6 => _6.min]), () => ( 0)),
      max: _nullishCoalesce(_optionalChain([config, 'access', _7 => _7.pool, 'optionalAccess', _8 => _8.min]), () => ( 5)),
      createTimeoutMillis: 3e4,
      acquireTimeoutMillis: 1e4,
      idleTimeoutMillis: 3e4,
      reapIntervalMillis: 1e3,
      createRetryIntervalMillis: 100
    },
    useNullAsDefault: true,
    connection: _chunk2RIL52B7js.environment.DATABASE_READ_REPLICA_URL,
    ..._objection.knexSnakeCaseMappers.call(void 0, )
  });
  knex = exports.knex = knexInstance;
  knexRead = exports.knexRead = knexReadInstance;
  _objection.Model.knex(knex);
  await _chunkETEUW55Gjs.connectToMongo.call(void 0, );
}, "setupDatabase");
setupDatabase();
if (_chunk2RIL52B7js.environment.TEST) {
  knex = exports.knex = new Proxy(function() {
    return void 0;
  }, {
    get(_target, property) {
      const handler = knexInstance[property];
      return typeof handler === "function" ? handler.bind(knexInstance) : handler;
    },
    apply(_target, _thisArgument, argumentsList) {
      return knexInstance(...argumentsList);
    }
  });
}




exports.knex = knex; exports.knexRead = knexRead; exports.setupDatabase = setupDatabase;
//# sourceMappingURL=knex.js.map