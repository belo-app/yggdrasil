import { Knex as KnexType } from "knex";
export interface DatabaseConfig {
    url: string;
    readReplicaUrl: string;
    pool: {
        min: number;
        max: number;
    };
}
declare let knex: KnexType;
declare let knexRead: KnexType;
export declare const setupPostgresDatabase: (config?: Partial<DatabaseConfig>) => Promise<void>;
export { knex, knexRead };
