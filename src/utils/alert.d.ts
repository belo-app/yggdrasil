import Decimal from "decimal.js";
export declare enum DiscordChannel {
    ALERTS = "ALERTS",
    OPERATION_METRICS = "OPERATION_METRICS"
}
export declare enum AlertEvaluator {
    LESS_THAN = "LESS_THAN",
    GREATER_THAN = "GREATER_THAN",
    EQUAL = "EQUAL"
}
export declare enum AlertType {
    THRESHOLD = "threshold"
}
export declare class Alert {
    name: string;
    body: string;
    type: AlertType;
    evaluate: AlertEvaluator;
    value: Decimal;
    trigger: Decimal;
    channel: DiscordChannel;
}
export type AlertData = Alert;
export declare enum AlertProviderNames {
    DISCORD = "discord"
}
