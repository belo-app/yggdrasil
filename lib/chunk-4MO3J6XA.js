"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkTUYBEZEZjs = require('./chunk-TUYBEZEZ.js');

// src/utils/database.ts
function commonColumns(knex, table) {
  table.bigIncrements("id").primary();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
  table.timestamp("deleted_at");
}
_chunkTUYBEZEZjs.__name.call(void 0, commonColumns, "commonColumns");



exports.commonColumns = commonColumns;
//# sourceMappingURL=chunk-4MO3J6XA.js.map