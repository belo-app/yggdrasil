import { Knex } from "knex";

export function commonColumns(knex: Knex, table: Knex.CreateTableBuilder) {
  table.bigIncrements("id").primary();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
  table.timestamp("deleted_at");
}
