import { BigQuery } from "@google-cloud/bigquery";
import memoize from "memoizee";

import { environment } from "./environment";

class BigQueryClient {
  public canUse = !environment.LOCAL && environment.BIGQUERY_CREDENTIALS;

  public get = memoize(() => {
    if (!this.canUse) {
      return;
    }

    try {
      const credentials = JSON.parse(environment.BIGQUERY_CREDENTIALS);

      return new BigQuery({
        projectId: "belo-8310",
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
      });
    } catch {
      //
    }
  });
}

export const bigQuery = new BigQueryClient();
