"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigQuery = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
const memoizee_1 = __importDefault(require("memoizee"));
const environment_1 = require("./environment");
class BigQueryClient {
    constructor() {
        this.canUse = !environment_1.environment.LOCAL && environment_1.environment.BIGQUERY_CREDENTIALS;
        this.get = (0, memoizee_1.default)(() => {
            if (!this.canUse) {
                return;
            }
            try {
                const credentials = JSON.parse(environment_1.environment.BIGQUERY_CREDENTIALS);
                return new bigquery_1.BigQuery({
                    projectId: "belo-8310",
                    credentials: {
                        client_email: credentials.client_email,
                        private_key: credentials.private_key,
                    },
                });
            }
            catch {
                //
            }
        });
    }
}
exports.bigQuery = new BigQueryClient();
