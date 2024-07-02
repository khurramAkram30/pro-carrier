"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLabel = void 0;
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const map_response_1 = require("./map-response");
const validate_1 = require("./validate");
const void_label_1 = require("../void-label/void-label");
const CreateLabel = async (request) => {
    (0, validate_1.validate)(request);
    let getShipmentResponse;
    const metadata = request === null || request === void 0 ? void 0 : request.metadata;
    const mapedRequest = (0, map_request_1.mapRequest)(request);
    const shipmentResponse = await (0, api_communicator_1.ProcessRequest)(mapedRequest, constants_1.CarrierOperation.CreateLabel);
    const isInternational = (0, map_request_1.isInternationalOrDomestic)(request);
    if (isInternational) {
        const mappedGetShipmentReq = (0, map_request_1.mapGetShipment)(request, shipmentResponse);
        getShipmentResponse = await (0, api_communicator_1.ProcessRequest)(mappedGetShipmentReq, constants_1.CarrierOperation.GetShipment);
    }
    if (shipmentResponse.ErrorLevel === 0) {
        const mappedGetShipmentRes = (0, map_response_1.mapResponse)(shipmentResponse, metadata, getShipmentResponse);
        return mappedGetShipmentRes;
    }
    else if (shipmentResponse.ErrorLevel === 1 || getShipmentResponse.ErrorLevel === 1) {
        const trackingNumber = shipmentResponse.Shipment.TrackingNumber;
        const voidLableReqMapping = (0, map_request_1.VoidLabelMapping)(trackingNumber, request.ship_from, metadata);
        (0, void_label_1.VoidLabels)(voidLableReqMapping);
        (0, utils_1.HandleError)(shipmentResponse);
    }
    else {
        (0, utils_1.HandleError)(shipmentResponse);
    }
};
exports.CreateLabel = CreateLabel;
//# sourceMappingURL=create-label.js.map