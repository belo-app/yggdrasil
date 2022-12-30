"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = exports.PagedResponse = exports.Response = exports.ResponseWithoutData = void 0;
const utils_1 = require("../../utils");
const ResponseWithoutData = (data) => ({
    200: utils_1.Type.Optional(data),
});
exports.ResponseWithoutData = ResponseWithoutData;
const Response = (data) => ({
    200: utils_1.Type.Object({
        data: utils_1.Type.Optional(data),
    }, {
        description: "Successful response",
    }),
});
exports.Response = Response;
const PagedResponse = (data) => ({
    200: utils_1.Type.Object({
        data: utils_1.Type.Optional(data),
        hasMore: utils_1.Type.Optional(utils_1.Type.Boolean()),
    }, {
        description: "Successful response",
    }),
});
exports.PagedResponse = PagedResponse;
const withAuth = (schema) => {
    return {
        ...schema,
        security: [
            {
                bearerAuth: [],
            },
        ],
    };
};
exports.withAuth = withAuth;
