"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const mapResponse = (voidRequestId, error) => {
    return {
        void_request_id: voidRequestId,
        message: error ? "Label not voided" : "Label voided successfully",
        errors: error ? [error] : undefined
    };
};
exports.mapResponse = mapResponse;
//# sourceMappingURL=map-response.js.map