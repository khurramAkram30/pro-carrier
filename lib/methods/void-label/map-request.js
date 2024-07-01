"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRequest = void 0;
const utils_1 = require("../../helpers/utils");
const constants_1 = require("../../helpers/constants");
const mapRequest = (request) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: getVoidLabel(request)
    };
};
exports.mapRequest = mapRequest;
const getVoidLabel = (request) => {
    return {
        Apikey: (0, utils_1.getAuthentication)(request.metadata),
        Command: constants_1.COMMANDS.VoidShipment,
        Shipment: getVoidShipment(request === null || request === void 0 ? void 0 : request.void_requests),
    };
};
const getVoidShipment = (voidRequest) => {
    var _a, _b;
    return {
        TrackingNumber: (_b = (_a = voidRequest === null || voidRequest === void 0 ? void 0 : voidRequest[0]) === null || _a === void 0 ? void 0 : _a.tracking_number) !== null && _b !== void 0 ? _b : ""
    };
};
//# sourceMappingURL=map-request.js.map