"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const map_response_1 = require("./map-response");
const validate_1 = require("./validate");
const Track = async (request) => {
    var _a;
    const metadata = (_a = request === null || request === void 0 ? void 0 : request.metadata) !== null && _a !== void 0 ? _a : {};
    (0, validate_1.validate)(request);
    const mappedRequest = (0, map_request_1.mapRequest)(request);
    const trackResponse = await (0, api_communicator_1.ProcessRequest)(mappedRequest, constants_1.CarrierOperation.Track);
    (0, utils_1.HandleError)(trackResponse);
    return (0, map_response_1.mapResponse)(trackResponse, metadata);
};
exports.Track = Track;
//# sourceMappingURL=track.js.map