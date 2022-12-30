"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonColumns = void 0;
function commonColumns(knex, table) {
    table.bigIncrements("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at");
}
exports.commonColumns = commonColumns;
