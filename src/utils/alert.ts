import Decimal from "decimal.js";

export enum DiscordChannel {
  ALERTS = "ALERTS",
  OPERATION_METRICS = "OPERATION_METRICS",
}

export enum AlertEvaluator {
  LESS_THAN = "LESS_THAN",
  GREATER_THAN = "GREATER_THAN",
  EQUAL = "EQUAL",
}

export enum AlertType {
  THRESHOLD = "threshold",
}

export class Alert {
  name!: string;

  body!: string;

  type!: AlertType;

  evaluate!: AlertEvaluator;

  value!: Decimal;

  trigger!: Decimal;

  channel!: DiscordChannel;
}

export type AlertData = Alert;

export enum AlertProviderNames {
  DISCORD = "discord",
}
