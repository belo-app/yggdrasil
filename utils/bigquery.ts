import { BigQuery } from "@google-cloud/bigquery";
import memoize from "memoizee";

import { environment } from "./environment";

class BigQueryClient {
  public canUse = !environment.LOCAL;

  public get = memoize(
    (credentials: { client_email: string; private_key: string }) => {
      if (!this.canUse) {
        return;
      }

      try {
        return new BigQuery({
          projectId: "belo-8310",
          credentials,
        });
      } catch {
        //
      }
    }
  );
}

export const bigQuery = new BigQueryClient();
