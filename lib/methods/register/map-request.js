"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRequest = void 0;
const constants_1 = require("../../helpers/constants");
const API_URL = constants_1.TEST_URL;
const mapRequest = (registration_info) => {
    const registerRequest = {
        Apikey: registration_info.api_key,
        Command: "OrderShipment",
        Shipment: {
            LabelOption: "System",
            ShipperReference: ""
        }
    };
    return {
        responseType: "json",
        method: "POST",
        url: API_URL,
        data: registerRequest
    };
};
exports.mapRequest = mapRequest;
//# sourceMappingURL=map-request.js.map