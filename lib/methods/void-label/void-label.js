"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidLabels = void 0;
const map_request_1 = require("./map-request");
const constants_1 = require("../../helpers/constants");
const api_communicator_1 = require("../../api/api-communicator");
const map_response_1 = require("./map-response");
const VoidLabels = async (request) => {
    var _a;
    const metadata = request.metadata;
    const voidResponse = [];
    for (let i = 0; i < request.void_requests.length; i++) {
        let error;
        const voidReq = request.void_requests[i];
        const trackingNumber = (_a = voidReq === null || voidReq === void 0 ? void 0 : voidReq.tracking_number) !== null && _a !== void 0 ? _a : "";
        const mappedRequest = (0, map_request_1.mapRequest)(trackingNumber, metadata);
        const voidLabelResponse = await (0, api_communicator_1.ProcessRequest)(mappedRequest, constants_1.CarrierOperation.VoidLabel);
        if (voidLabelResponse.ErrorLevel !== 0) {
            error = voidLabelResponse.Error;
        }
        voidResponse.push((0, map_response_1.mapResponse)(voidReq.void_request_id, error));
    }
    return {
        void_responses: voidResponse,
        metadata: metadata
    };
};
exports.VoidLabels = VoidLabels;
//# sourceMappingURL=void-label.js.map