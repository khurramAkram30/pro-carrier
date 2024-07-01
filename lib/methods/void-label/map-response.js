"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const mapResponse = (request, response) => {
    var _a, _b;
    return {
        void_responses: [{
                void_request_id: (_b = (_a = request === null || request === void 0 ? void 0 : request.void_requests) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.void_request_id,
                message: getMessage(response),
                errors: []
            }],
        metadata: request === null || request === void 0 ? void 0 : request.metadata
    };
};
exports.mapResponse = mapResponse;
const getMessage = (response) => {
    if (response.ErrorLevel === 0) {
        return "Label voided successfully";
    }
    else {
        return "Label cannot be voided";
    }
};
//# sourceMappingURL=map-response.js.map