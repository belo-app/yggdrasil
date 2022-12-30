"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertProviderNames = exports.Alert = exports.AlertType = exports.AlertEvaluator = exports.DiscordChannel = void 0;
var DiscordChannel;
(function (DiscordChannel) {
    DiscordChannel["ALERTS"] = "ALERTS";
    DiscordChannel["OPERATION_METRICS"] = "OPERATION_METRICS";
})(DiscordChannel = exports.DiscordChannel || (exports.DiscordChannel = {}));
var AlertEvaluator;
(function (AlertEvaluator) {
    AlertEvaluator["LESS_THAN"] = "LESS_THAN";
    AlertEvaluator["GREATER_THAN"] = "GREATER_THAN";
    AlertEvaluator["EQUAL"] = "EQUAL";
})(AlertEvaluator = exports.AlertEvaluator || (exports.AlertEvaluator = {}));
var AlertType;
(function (AlertType) {
    AlertType["THRESHOLD"] = "threshold";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
class Alert {
}
exports.Alert = Alert;
var AlertProviderNames;
(function (AlertProviderNames) {
    AlertProviderNames["DISCORD"] = "discord";
})(AlertProviderNames = exports.AlertProviderNames || (exports.AlertProviderNames = {}));
