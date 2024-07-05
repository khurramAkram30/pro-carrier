"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const constants_1 = require("../../helpers/constants");
const mapResponse = (response, metadata) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const eventTracking = response.Shipment.Events;
    return {
        tracking_info: {
            carrier_name: constants_1.CARRIER_NAME,
            tracking_number: response.Shipment.TrackingNumber,
            standardized_status_code: getStandarizedCode(eventTracking),
            carrier_status_code: (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.Shipment) === null || _a === void 0 ? void 0 : _a.Events) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.Code,
            carrier_status_description: (_f = (_e = (_d = response === null || response === void 0 ? void 0 : response.Shipment) === null || _d === void 0 ? void 0 : _d.Events) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.Description,
            estimated_delivery_datetime: "",
            actual_delivery_datetime: (_j = (_h = (_g = response === null || response === void 0 ? void 0 : response.Shipment) === null || _g === void 0 ? void 0 : _g.Events) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.DateTime,
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
                    country: (_o = (_m = (_l = (_k = response === null || response === void 0 ? void 0 : response.Shipment) === null || _k === void 0 ? void 0 : _k.Events) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.Country) !== null && _o !== void 0 ? _o : undefined,
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
    const trackCode = (_a = trackingEvents === null || trackingEvents === void 0 ? void 0 : trackingEvents[0].Code) !== null && _a !== void 0 ? _a : [];
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
        case 'ABZ':
            return connect_carrier_api_1.StandardizedStatusCodes.DeliveredToServicePoint;
    }
};
//# sourceMappingURL=map-response.js.map