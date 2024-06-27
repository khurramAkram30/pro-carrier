"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOM_CONTENTS = exports.TRADE_CODE = exports.WEIGHT_UNIT = exports.SERVICE_API_CODES = exports.COMMANDS = exports.TRACKING_URL = exports.CARRIER_URL = exports.TEST_URL = exports.CarrierOperation = void 0;
var CarrierOperation;
(function (CarrierOperation) {
    CarrierOperation["Register"] = "Register";
    CarrierOperation["CreateLabel"] = "CreateLabel";
    CarrierOperation["VoidLabel"] = "VoidLabel";
    CarrierOperation["Track"] = "Track";
    CarrierOperation["GetShipment"] = "GetShipment";
})(CarrierOperation || (exports.CarrierOperation = CarrierOperation = {}));
exports.TEST_URL = 'https://dgapi.app/API/?testMode=1';
exports.CARRIER_URL = 'https://weareprocarrier.com/';
exports.TRACKING_URL = 'https://tracking.weareprocarrier.com/?tn=[track_number]';
exports.COMMANDS = Object.freeze({
    OrderShipments: 'OrderShipment',
    GetShipment: 'GetShipmentInvoice',
    VoidShipment: 'VoidShipment'
});
exports.SERVICE_API_CODES = Object.freeze({
    ProCarrierParcelPacket: 'PCPT',
    ProCarrierParcelPacketInternational: 'PCPT',
    ProCarrierParcelExpress: 'PCPE',
    ProCarrierParcelExpressInternational: 'PCPE',
    ProCarrierParcelPlus: 'PCPL',
    ProCarrierParcelPlusInternational: 'PCPL',
    ProCarrierParcelPost: 'PCPP',
    ProCarrierParcelPostInternational: 'PCPP'
});
exports.WEIGHT_UNIT = Object.freeze({
    Pounds: 'pounds',
    Kilogram: 'kilogram'
});
exports.TRADE_CODE = Object.freeze({
    DDP: 'DDP',
    DDU: 'DDU'
});
exports.CUSTOM_CONTENTS = Object.freeze({
    Sample: 'sample',
    CommercialSample: 'CommercialSample',
    Document: 'documents',
    gift: 'gift',
    other: 'other',
    Personal: 'Personal',
    SaleOfGood: 'SaleOfGood',
    returnedgoods: 'returned_goods',
    ReturnedGoods: 'ReturnedGoods'
});
//# sourceMappingURL=constants.js.map