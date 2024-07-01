"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const constants_1 = require("../../helpers/constants");
const mapResponse = (response, metadata) => {
    var _a, _b, _c, _d;
    const eventTracking = response.Shipment.Events;
    return {
        tracking_info: {
            carrier_name: constants_1.CARRIER_NAME,
            tracking_number: response.Shipment.TrackingNumber,
            standardized_status_code: getStandarizedCode(eventTracking),
            carrier_status_code: response.Shipment.Events[0].CarrierCode,
            carrier_status_description: response.Shipment.Events[0].CarrierDescription,
            estimated_delivery_datetime: "",
            actual_delivery_datetime: response.Shipment.Events[0].DateTime,
            weight: response.Shipment.Weight,
            service: {
                code: response.Shipment.Service
            },
            events: [
                {
                    event_datetime: response.Shipment.Events[0].DateTime,
                    event_code: response.Shipment.Events[0].Code,
                    event_datetime_local: response.Shipment.Events[0].DateTime,
                    description: response.Shipment.Events[0].Description,
                    country: (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.Shipment) === null || _a === void 0 ? void 0 : _a.Events) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.Country) !== null && _d !== void 0 ? _d : undefined,
                    status_code: getStandarizedCode(eventTracking)
                }
            ],
        },
        metadata: metadata
    };
};
exports.mapResponse = mapResponse;
const getStandarizedCode = (trackingEvents) => {
    var _a;
    const trackCode = (_a = trackingEvents[0].CarrierCode) !== null && _a !== void 0 ? _a : [];
    switch (trackCode) {
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
        case 'SP':
            return connect_carrier_api_1.StandardizedStatusCodes.DeliveredToServicePoint;
    }
};
//# sourceMappingURL=map-response.js.map