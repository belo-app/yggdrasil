export function getEnvironment<T = string>(key: string, defaultValue?: T): T {
  return (process.env[key] ?? defaultValue ?? "") as T;
}

export const environment = {
  NODE_ENV: getEnvironment("NODE_ENV", "development"),
  GIT_SHA: getEnvironment("GIT_SHA"),
  DOPPLER_ENVIRONMENT: getEnvironment("DOPPLER_ENVIRONMENT", "development"),
  DEMO: getEnvironment("DEMO") === "true",
  JWT_SECRET: getEnvironment("JWT_SECRET", "secret"),
  LOCAL: false,
  DEV: false,
  TEST: false,
  PROD: false,
  DATABASE_URL: getEnvironment(
    "DATABASE_URL",
    "postgres://postgres:postgres@localhost:5432/belo?sslmode=disable"
  ),
  DATABASE_URL_TEST: getEnvironment(
    "DATABASE_URL_TEST",
    "postgres://postgres:postgres@localhost:5432/belo_test"
  ),
  MONGO_DATABASE_URL: getEnvironment(
    "MONGO_DATABASE_URL",
    "mongodb://mongouser:mongopass@localhost:27017/belo_local?authSource=admin"
  ),
  MONGO_DATABASE_URL_TEST: getEnvironment(
    "MONGO_DATABASE_URL_TEST",
    "mongodb://mongouser:mongopass@localhost:27017/belo_test"
  ),
  DATABASE_PROXY_URL: getEnvironment(
    "DATABASE_PROXY_URL",
    "postgres://postgres:postgres@localhost:5432/belo?sslmode=disable"
  ),
  DATABASE_READ_REPLICA_URL: getEnvironment(
    "DATABASE_READ_REPLICA_URL",
    "postgres://postgres:postgres@localhost:5432/belo?sslmode=disable"
  ),
  AWS_REGION: getEnvironment("AWS_REGION", "us-east-2"),
  GOOGLE_APPLICATION_CREDENTIALS: Buffer.from(
    getEnvironment<any>("GOOGLE_APPLICATION_CREDENTIALS"),
    "base64"
  ).toString("utf8"),
  GOOGLE_PLACE_API_KEY: getEnvironment("GOOGLE_PLACE_API_KEY", ""),
  S3_PUBLIC_BUCKET_NAME: getEnvironment("S3_PUBLIC_BUCKET_NAME", "belo-assets"),
  S3_PRIVATE_BUCKET_NAME: getEnvironment(
    "S3_PRIVATE_BUCKET_NAME",
    "belo-private-assets"
  ),
  BIND_USERNAME: getEnvironment("BIND_USERNAME", ""),
  BIND_PASSWORD: getEnvironment("BIND_PASSWORD", ""),
  MATI_CLIENT_ID: getEnvironment("MATI_CLIENT_ID", ""),
  MATI_CLIENT_SECRET: getEnvironment("MATI_CLIENT_SECRET", ""),
  MATI_FLOW_ID: getEnvironment("MATI_FLOW_ID", ""),
  MATI_WEBHOOK_SECRET: getEnvironment("MATI_WEBHOOK_SECRET", ""),
  BITCOIN_SEEDPHRASE: getEnvironment(
    "BITCOIN_SEEDPHRASE",
    "praise you muffin lion enable neck grocery crumble super myself license ghost"
  ),
  ETHEREUM_SEEDPHRASE: getEnvironment(
    "ETHEREUM_SEEDPHRASE",
    "praise you muffin lion enable neck grocery crumble super myself license ghost"
  ),
  TRON_SEEDPHRASE: getEnvironment(
    "TRON_SEEDPHRASE",
    "praise you muffin lion enable neck grocery pepe super myself license ghost"
  ),
  QUANTIA_USERNAME: getEnvironment("QUANTIA_USERNAME"),
  QUANTIA_PASSWORD: getEnvironment("QUANTIA_PASSWORD"),
  QUANTIA_MFA_SECRET: getEnvironment("QUANTIA_MFA_SECRET"),
  QUANTIA_API_URL: getEnvironment("QUANTIA_API_URL"),
  TRANSACTION_QUEUE: getEnvironment("TRANSACTION_QUEUE"),
  OKEX_PASSPHRASE: getEnvironment("OKEX_PASSPHRASE"),
  OKEX_API_KEY: getEnvironment("OKEX_API_KEY"),
  OKEX_SECRET_KEY: getEnvironment("OKEX_SECRET_KEY"),
  OKEX_TRADE_PASSWORD: getEnvironment("OKEX_TRADE_PASSWORD"),
  OKEX_DEMO: getEnvironment("OKEX_DEMO") === "true",
  OKEX_BROKER_CODE: getEnvironment("OKEX_BROKER_CODE"),
  OKEX_TRADING_PASSPHRASE: getEnvironment("OKEX_TRADING_PASSPHRASE"),
  OKEX_TRADING_API_KEY: getEnvironment("OKEX_TRADING_API_KEY"),
  OKEX_TRADING_SECRET_KEY: getEnvironment("OKEX_TRADING_SECRET_KEY"),
  OKEX_ND_SUBACCOUNT_NAME: getEnvironment("OKEX_ND_SUBACCOUNT_NAME"),
  DECRYPTO_USERNAME: getEnvironment("DECRYPTO_USERNAME"),
  DECRYPTO_PASSWORD: getEnvironment("DECRYPTO_PASSWORD"),
  BIND_BASE_URL: getEnvironment("BIND_BASE_URL"),
  BIND_PROXY_URL: getEnvironment("BIND_PROXY_URL"),
  BIND_PROXY_USERNAME: getEnvironment("BIND_PROXY_USERNAME"),
  BIND_PROXY_PASSWORD: getEnvironment("BIND_PROXY_PASSWORD"),
  MATI_EMAIL: getEnvironment("MATI_EMAIL"),
  MATI_PASSWORD: getEnvironment("MATI_PASSWORD"),
  POMELO_API_URL: getEnvironment("POMELO_API_URL"),
  POMELO_API_CLIENT_ID: getEnvironment("POMELO_API_CLIENT_ID"),
  POMELO_API_CLIENT_SECRET: getEnvironment("POMELO_API_CLIENT_SECRET"),
  POMELO_API_AUDIENCE_URL: getEnvironment("POMELO_API_AUDIENCE_URL"),
  POMELO_API_KEY: getEnvironment("POMELO_API_KEY"),
  POMELO_SFTP_USER: getEnvironment("POMELO_SFTP_USER"),
  POMELO_SFTP_HOST: getEnvironment("POMELO_SFTP_HOST"),
  POMELO_SFTP_PASSPHRASE: getEnvironment("POMELO_SFTP_PASSPHRASE"),
  POMELO_SFTP_PRIVATE_KEY: getEnvironment("POMELO_SFTP_PRIVATE_KEY"),
  BELO_S3_PRIVATE_CONCILIATION_BUCKET: getEnvironment(
    "BELO_S3_PRIVATE_CONCILIATION_BUCKET"
  ),
  POMELO_API_SECRET: getEnvironment("POMELO_API_SECRET"),
  REDIS_URL: getEnvironment("REDIS_URL"),
  AGILPAGOS_URL: getEnvironment("AGILPAGOS_URL"),
  AGILPAGOS_ID_ENTIDAD: getEnvironment("AGILPAGOS_ID_ENTIDAD"),
  AGILPAGOS_USERNAME: getEnvironment("AGILPAGOS_USERNAME"),
  AGILPAGOS_PASSWORD: getEnvironment("AGILPAGOS_PASSWORD"),
  AGILPAGOS_API_KEY: getEnvironment("AGILPAGOS_API_KEY"),
  AGILPAGOS_API_ID: getEnvironment("AGILPAGOS_API_ID"),
  AGILPAGOS_BELO_CUSTOMER_ID: getEnvironment("AGILPAGOS_BELO_CUSTOMER_ID"),
  COINAG_PROXY_URL: getEnvironment("COINAG_PROXY_URL"),
  COINAG_PROXY_USERNAME: getEnvironment("COINAG_PROXY_USERNAME"),
  COINAG_PROXY_PASSWORD: getEnvironment("COINAG_PROXY_PASSWORD"),
  COINAG_USERNAME: getEnvironment("COINAG_USERNAME"),
  COINAG_PASSWORD: getEnvironment("COINAG_PASSWORD"),
  COINAG_CLIENT_ID: getEnvironment("COINAG_CLIENT_ID"),
  COINAG_CLIENT_SECRET: getEnvironment("COINAG_CLIENT_SECRET"),
  COINAG_DEBIN_CLIENT_ID: getEnvironment("COINAG_DEBIN_CLIENT_ID"),
  COINAG_DEBIN_CLIENT_SECRET: getEnvironment("COINAG_DEBIN_CLIENT_SECRET"),
  COINAG_DEBIN_API_PATH: getEnvironment("COINAG_DEBIN_API_PATH"),
  COINAG_PSP_ID: getEnvironment("COINAG_PSP_ID"),
  COINAG_PSP_CUIT: getEnvironment("COINAG_PSP_CUIT"),
  COINAG_ACCOUNT_ID: getEnvironment("COINAG_ACCOUNT_ID"),
  COINAG_API_PATH: getEnvironment("COINAG_API_PATH"),
  COINAG_WHITELIST_IPS: getEnvironment(
    "COINAG_WHITELIST_IPS",
    JSON.stringify([])
  ),
  OPENNODE_KEY: getEnvironment("OPENNODE_KEY"),
  OPENNODE_DEPOSIT_WEBHOOK: getEnvironment("OPENNODE_DEPOSIT_WEBHOOK"),
  OPENNODE_WITHDRAWAL_WEBHOOK: getEnvironment("OPENNODE_WITHDRAWAL_WEBHOOK"),
  MAIN_MATI_FLOW_ID: getEnvironment("MAIN_MATI_FLOW_ID"),
  FOREIGN_MATI_FLOW_ID: getEnvironment("FOREIGN_MATI_FLOW_ID"),
  APP_STORE_URL: getEnvironment("APP_STORE_URL", "https://belo.app"),
  SERVER_BASE_URL: getEnvironment("SERVER_BASE_URL", "http://localhost:3000"),
  DASHBOARD_BASE_URL: getEnvironment(
    "DASHBOARD_BASE_URL",
    "http://localhost:3000"
  ),
  WEB_APP_BASE_URL: getEnvironment("WEB_APP_BASE_URL", "http://localhost:3000"),
  REFERRAL_BASE_URL: getEnvironment(
    "REFERRAL_BASE_URL",
    "http://localhost:3000"
  ),
  ADJUST_URL: getEnvironment("ADJUST_URL"),
  ADJUST_TOKEN: getEnvironment("ADJUST_TOKEN"),
  ADJUST_APP_TOKEN: getEnvironment("ADJUST_APP_TOKEN"),
  NEW_RELIC_LICENSE_KEY: getEnvironment("NEW_RELIC_LICENSE_KEY"),
  FIREHOSE_STREAM: getEnvironment("FIREHOSE_STREAM"),
  AWS_ACCESS_KEY_ID: getEnvironment("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: getEnvironment("AWS_SECRET_ACCESS_KEY"),
  BONSAI_USER: getEnvironment("BONSAI_USER"),
  BONSAI_PASSWORD: getEnvironment("BONSAI_PASSWORD"),
  FUSION_AUTH_URL: getEnvironment("FUSION_AUTH_URL"),
  FUSION_AUTH_API_KEY: getEnvironment("FUSION_AUTH_API_KEY"),
  FUSION_AUTH_TENANT_DASHBOARD: getEnvironment("FUSION_AUTH_TENANT_DASHBOARD"),
  FUSION_AUTH_TENANT_APP: getEnvironment("FUSION_AUTH_TENANT_APP"),
  FUSION_AUTH_TENANT_API_V1: getEnvironment("FUSION_AUTH_TENANT_API_V1"),
  FUSION_AUTH_APPLICATION_DASHBOARD: getEnvironment(
    "FUSION_AUTH_APPLICATION_DASHBOARD"
  ),
  FUSION_AUTH_APPLICATION_APP: getEnvironment("FUSION_AUTH_APPLICATION_APP"),
  FUSION_AUTH_APP_JWT_SECRET: getEnvironment(
    "FUSION_AUTH_APP_JWT_SECRET",
    "no-app-secret"
  ),
  FUSION_AUTH_DASHBOARD_JWT_SECRET: getEnvironment(
    "FUSION_AUTH_DASHBOARD_JWT_SECRET",
    "no-app-secret"
  ),
  FUSION_AUTH_API_V1_ENTITY: getEnvironment("FUSION_AUTH_API_V1_ENTITY"),
  FUSION_AUTH_API_V1_JWT_SECRET: getEnvironment(
    "FUSION_AUTH_API_V1_JWT_SECRET",
    "no-app-secret"
  ),
  REDIS_CACHE_URL: getEnvironment("REDIS_CACHE_URL"),
  QR_RESOLVER_TOKEN: getEnvironment("QR_RESOLVER_TOKEN", JSON.stringify({})),
  LINK_CLIENT_URL: getEnvironment("LINK_CLIENT_URL"),
  LINK_CLIENT_SECRET: getEnvironment("LINK_CLIENT_SECRET"),
  LINK_CLIENT_ID: getEnvironment("LINK_CLIENT_ID"),
  INFLUX_TOKEN: getEnvironment("INFLUX_TOKEN"),
  BIGQUERY_CREDENTIALS: Buffer.from(
    getEnvironment<any>("BIGQUERY_CREDENTIALS"),
    "base64"
  ).toString("utf8"),
  RAPIBOY_API_URL: getEnvironment("RAPIBOY_API_URL"),
  RAPIBOY_LOGIN_TOKEN: getEnvironment("RAPIBOY_LOGIN_TOKEN"),
  TAP_LOGIN_PATH: getEnvironment("TAP_LOGIN_PATH"),
  TAP_LOGIN_API_KEY: getEnvironment("TAP_LOGIN_API_KEY"),
  TAP_COMPANIES_PATH: getEnvironment("TAP_COMPANIES_PATH"),
  TAP_COMPANIES_API_KEY: getEnvironment("TAP_COMPANIES_API_KEY"),
  TAP_SERVICES_PATH: getEnvironment("TAP_SERVICES_PATH"),
  TAP_SERVICES_API_KEY: getEnvironment("TAP_SERVICES_API_KEY"),
  TAP_RECHARGE_API_KEY: getEnvironment("TAP_RECHARGE_API_KEY"),
  TAP_RECHARGE_PATH: getEnvironment("TAP_RECHARGE_PATH"),
  TAP_USERNAME: getEnvironment("TAP_USERNAME"),
  TAP_PASSWORD: getEnvironment("TAP_PASSWORD"),
  EXPO_ACCESS_TOKEN: getEnvironment("EXPO_ACCESS_TOKEN"),
  TAP_SFTP_USER: getEnvironment("TAP_SFTP_USER"),
  TAP_SFTP_HOST: getEnvironment("TAP_SFTP_HOST"),
  TAP_SFTP_PASSPHRASE: getEnvironment("TAP_SFTP_PASSPHRASE"),
  TAP_SFTP_PRIVATE_KEY: getEnvironment("TAP_SFTP_PRIVATE_KEY"),
  CELERI_CLIENT_ID: getEnvironment("CELERI_CLIENT_ID"),
  CELERI_CLIENT_SECRET: getEnvironment("CELERI_CLIENT_SECRET"),
  CELERI_API_URL: getEnvironment("CELERI_API_URL"),
  LOKI_USER: getEnvironment("LOKI_USER"),
  LOKI_PASSWORD: getEnvironment("LOKI_PASSWORD"),
  LOKI_HOST: getEnvironment("LOKI_HOST"),
  OTLP_TRACE_EXPORTER_URL: getEnvironment(
    "OTLP_TRACE_EXPORTER_URL",
    "http://localhost:4318/v1/traces"
  ),
  CRYPTO_YA_BASE_URL: getEnvironment("CRIPTO_YA_BASE_URL"),
  DECRYPTO_BASE_URL: getEnvironment("DECRYPTO_BASE_URL"),
  GOOGLE_API_BASE_URL: getEnvironment("GOOGLE_API_BASE_URL"),
  OKEX_BASE_URL: getEnvironment("OKEX_BASE_URL"),
  DISABLE_TRACE: getEnvironment("DISABLE_TRACE"),
};

environment.LOCAL = !environment.GIT_SHA;
environment.TEST = process.env.NODE_ENV === "test";

export function extendSharedEnvironment<T>(
  packageEnvironment: T
): typeof environment & T {
  return { ...environment, ...packageEnvironment };
}
