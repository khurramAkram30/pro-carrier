"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRequest = void 0;
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const connect_carrier_api_utils_1 = require("connect-carrier-api-utils");
const mapRequest = (request) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: GetTrack(request)
    };
};
exports.mapRequest = mapRequest;
const GetTrack = (request) => {
    return {
        Apikey: (0, utils_1.getAuthentication)(request.metadata),
        Command: constants_1.CARRIER_METHODS.TrackShipment,
        Shipment: getTackShipment(request.identifiers)
    };
};
const getTackShipment = (identifiers) => {
    return {
        TrackingNumber: (0, connect_carrier_api_utils_1.GetTrackingNumber)(identifiers),
    };
};
//# sourceMappingURL=map-request.js.map