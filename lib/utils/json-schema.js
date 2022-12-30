"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const typebox_1 = require("@sinclair/typebox");
const DateKind = Symbol("DateKind");
class BeloTypeBuilder extends typebox_1.TypeBuilder {
    Optional(item) {
        if (item?.[typebox_1.Kind] == "Union") {
            return item;
        }
        return { ...item, [typebox_1.Modifier]: "Optional", nullable: true };
    }
    Enum(item) {
        return { type: "string", enum: Object.keys(item) };
    }
    DateString() {
        return this.String();
    }
    ObjectId() {
        return this.String();
    }
}
exports.Type = new BeloTypeBuilder();
