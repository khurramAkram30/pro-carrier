"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRequest = void 0;
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const mapRequest = (request) => {
    console.log(request);
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: orderShipment(request)
    };
};
exports.mapRequest = mapRequest;
const orderShipment = (data) => ({
    ApiKey: (0, utils_1.getAuthentication)(data.metadata),
    Command: (0, utils_1.getCommand)(constants_1.CarrierOperation.CreateLabel),
    Shipments: getShipment(data)
});
const getShipment = (data) => {
    return {
        RequireCarrierTrackingNumber: true,
    };
};
//# sourceMappingURL=map-request.js.map