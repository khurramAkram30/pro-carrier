"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRequest = void 0;
const utils_1 = require("../../helpers/utils");
const constants_1 = require("../../helpers/constants");
const mapRequest = (trackingNumber, metadata) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: {
            Apikey: (0, utils_1.getAuthentication)(metadata),
            Command: constants_1.COMMANDS.VoidShipment,
            Shipment: getVoidShipment(trackingNumber),
        }
    };
};
exports.mapRequest = mapRequest;
const getVoidShipment = (trackingNumber) => {
    return {
        TrackingNumber: trackingNumber
    };
};
//# sourceMappingURL=map-request.js.map