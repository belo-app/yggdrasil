import { BigQuery } from "@google-cloud/bigquery";
import memoize from "memoizee";
declare class BigQueryClient {
    canUse: boolean;
    get: ((credentials: {
        client_email: string;
        private_key: string;
    }) => BigQuery | undefined) & memoize.Memoized<(credentials: {
        client_email: string;
        private_key: string;
    }) => BigQuery | undefined>;
}
export declare const bigQuery: BigQueryClient;
export {};
//# sourceMappingURL=bigquery.d.ts.map