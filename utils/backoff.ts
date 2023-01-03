import { delay } from "./delay";
import { Errors } from "./error";

export async function backoff<T>(
  handler: () => Promise<T>,
  {
    maxAttempts,
    delayInMilliseconds,
  }: { maxAttempts: number; delayInMilliseconds: number }
): Promise<{ data: T; attempt: number }> {
  const attempts = Array.from({ length: maxAttempts }).map((_, index) => index);

  for (const attempt of attempts) {
    const totalDelay = (2 ** attempt - 1) * delayInMilliseconds;

    await delay(totalDelay);

    try {
      const data = await handler();

      return { data, attempt };
    } catch {
      //
    }
  }

  throw Errors.backoffFailed();
}
