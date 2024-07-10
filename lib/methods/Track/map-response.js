"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const constants_1 = require("../../helpers/constants");
const mapResponse = (response, metadata) => {
    const eventSortDesc = response.Shipment.Events.sort((a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime());
    const latestEvent = eventSortDesc[0];
    return {
        tracking_info: {
            carrier_name: constants_1.CARRIER_NAME,
            tracking_number: response.Shipment.TrackingNumber,
            standardized_status_code: getStandarizedCode(latestEvent === null || latestEvent === void 0 ? void 0 : latestEvent.Code),
            carrier_status_code: latestEvent.Code,
            carrier_status_description: latestEvent === null || latestEvent === void 0 ? void 0 : latestEvent.Description,
            estimated_delivery_datetime: "",
            actual_delivery_datetime: latestEvent === null || latestEvent === void 0 ? void 0 : latestEvent.DateTime,
            weight: response.Shipment.Weight,
            service: {
                code: response.Shipment.Service
            },
            events: eventSortDesc === null || eventSortDesc === void 0 ? void 0 : eventSortDesc.map((evt) => {
                var _a;
                return ({
                    event_datetime: evt.DateTime,
                    event_code: evt.Code,
                    event_datetime_local: evt.DateTime,
                    description: evt.Description,
                    country: (_a = evt === null || evt === void 0 ? void 0 : evt.Country) !== null && _a !== void 0 ? _a : undefined,
                    status_code: getStandarizedCode(evt.Code)
                });
            }),
        },
        metadata: metadata
    };
};
exports.mapResponse = mapResponse;
const getStandarizedCode = (trackingCode) => {
    switch (trackingCode) {
        case 'AAY':
        case 'AAM':
        case 'ACZ':
        case 'ADD':
        case 'ADA':
        case 'AAN':
        case 'AAO':
        case 'ABC':
        case 'ACO':
        case 'ABS':
        case 'ACM':
        case 'AET':
        case 'AEU':
        case 'AEZ':
            return connect_carrier_api_1.StandardizedStatusCodes.InTransit;
        case 'ADM':
        case 'AND':
        case 'ADO':
        case 'ADR':
        case 'ABY':
        case 'ACH':
        case 'AEJ':
        case 'AEK':
        case 'AEM':
        case 'ACR':
        case 'AEH':
        case 'ABQ':
        case 'ACS':
        case 'ADV':
        case 'ADW':
        case 'ADX':
        case 'ADY':
        case 'AFA':
        case 'ACV':
        case 'AEA':
        case 'AAE':
        case 'AAG':
        case 'AAH':
        case 'AAI':
        case 'AAJ':
            return connect_carrier_api_1.StandardizedStatusCodes.Exception;
        case 'AES':
        case 'AEY':
        case 'AEV':
            return connect_carrier_api_1.StandardizedStatusCodes.Delivered;
        case 'ABZ':
            return connect_carrier_api_1.StandardizedStatusCodes.DeliveredToServicePoint;
    }
};
//# sourceMappingURL=map-response.js.map