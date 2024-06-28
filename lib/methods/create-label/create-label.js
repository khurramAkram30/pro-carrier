"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLabel = void 0;
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const connect_runtime_1 = require("@shipengine/connect-runtime");
const map_response_1 = require("./map-response");
const validate_1 = require("./validate");
const CreateLabel = async (request) => {
    var _a;
    (0, validate_1.validate)(request);
    const metadata = request === null || request === void 0 ? void 0 : request.metadata;
    const mapedRequest = (0, map_request_1.mapRequest)(request);
    try {
        const shipmentResponse = await (0, api_communicator_1.ProcessRequest)(mapedRequest, constants_1.CarrierOperation.CreateLabel);
        (0, utils_1.HandleError)(shipmentResponse);
        const isInternational = (0, map_request_1.isInternationalOrDomestic)(request);
        if (isInternational) {
            const mappedGetShipmentReq = (0, map_request_1.mapGetShipment)(request, shipmentResponse);
            const getShipmentResponse = await (0, api_communicator_1.ProcessRequest)(mappedGetShipmentReq, constants_1.CarrierOperation.GetShipment);
            const mappedGetShipmentRes = (0, map_response_1.mapResponse)(shipmentResponse, metadata, getShipmentResponse);
            return mappedGetShipmentRes;
        }
        else {
            const mappedOrderShipmentRes = (0, map_response_1.mapResponse)(shipmentResponse, metadata);
            return mappedOrderShipmentRes;
        }
        return;
    }
    catch (error) {
        throw new connect_runtime_1.ExternalServerError((_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a[0].message);
    }
};
exports.CreateLabel = CreateLabel;
//# sourceMappingURL=create-label.js.map