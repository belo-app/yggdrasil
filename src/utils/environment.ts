export function getEnvironment<T = string>(key: string, defaultValue?: T): T {
  return (process.env[key] ?? defaultValue ?? "") as T;
}

export const environment = {
  LOCAL: false,
  TEST: false,
  GIT_SHA: getEnvironment("GIT_SHA"),
};

environment.LOCAL = !environment.GIT_SHA;
environment.TEST = process.env.NODE_ENV === "test";

export function extendSharedEnvironment<T>(
  packageEnvironment: T
): typeof environment & T {
  return { ...environment, ...packageEnvironment };
}
