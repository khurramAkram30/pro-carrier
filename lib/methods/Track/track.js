"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const connect_carrier_api_utils_1 = require("connect-carrier-api-utils");
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const map_response_1 = require("./map-response");
const Track = async (request) => {
    var _a, _b, _c, _d;
    const metadata = (_a = request === null || request === void 0 ? void 0 : request.metadata) !== null && _a !== void 0 ? _a : {};
    const trackingNumber = (0, connect_carrier_api_utils_1.GetTrackingNumber)((_b = request.identifiers) !== null && _b !== void 0 ? _b : []);
    if (!trackingNumber) {
        throw new connect_runtime_1.BadRequestError("Please provide tracking_number.");
    }
    const mappedRequest = (0, map_request_1.mapRequest)(request);
    try {
        const trackResponse = await (0, api_communicator_1.ProcessRequest)(mappedRequest, constants_1.CarrierOperation.Track);
        (0, utils_1.HandleError)(trackResponse);
        return (0, map_response_1.mapResponse)(trackResponse, metadata);
    }
    catch (error) {
        throw new connect_runtime_1.ExternalServerError((_d = (_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message);
    }
};
exports.Track = Track;
//# sourceMappingURL=track.js.map