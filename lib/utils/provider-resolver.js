"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderResolver = void 0;
const memoizee_1 = __importDefault(require("memoizee"));
class ProviderResolver {
    constructor(base, providerClassMap) {
        this.base = base;
        this.providerClassMap = providerClassMap;
        this.getInstances = (0, memoizee_1.default)(() => {
            let instances = {};
            for (const [key, clazz] of Object.entries(this.providerClassMap())) {
                if (!clazz) {
                    continue;
                }
                instances = {
                    ...instances,
                    [key]: new clazz(),
                };
            }
            const defaultInstance = new this.base();
            instances.default = defaultInstance;
            return instances;
        });
    }
    resolveByType(type) {
        const instances = this.getInstances();
        return instances[type] ?? instances.default;
    }
}
exports.ProviderResolver = ProviderResolver;
