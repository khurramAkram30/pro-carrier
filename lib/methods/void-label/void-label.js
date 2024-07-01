"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidLabels = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const map_request_1 = require("./map-request");
const constants_1 = require("../../helpers/constants");
const api_communicator_1 = require("../../api/api-communicator");
const utils_1 = require("../../helpers/utils");
const map_response_1 = require("./map-response");
const VoidLabels = async (request) => {
    var _a, _b, _c, _d;
    const trackingNumber = (_c = (_b = (_a = request === null || request === void 0 ? void 0 : request.void_requests) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.tracking_number) !== null && _c !== void 0 ? _c : "";
    if (!trackingNumber) {
        throw new connect_runtime_1.BadRequestError("Please provide tracking_number.");
    }
    const mappedRequest = (0, map_request_1.mapRequest)(request);
    try {
        const voidResponse = await (0, api_communicator_1.ProcessRequest)(mappedRequest, constants_1.CarrierOperation.VoidLabel);
        (0, utils_1.HandleError)(voidResponse);
        return (0, map_response_1.mapResponse)(request, voidResponse);
    }
    catch (error) {
        throw new connect_runtime_1.ExternalServerError((_d = error === null || error === void 0 ? void 0 : error.details) === null || _d === void 0 ? void 0 : _d[0].message);
    }
};
exports.VoidLabels = VoidLabels;
//# sourceMappingURL=void-label.js.map