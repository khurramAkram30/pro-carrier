"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_POUND = exports.MaximumGirth = exports.MaximumSum = exports.MaximumLength = exports.MaximumWeight = exports.CUSTOM_CONTENTS = exports.SERVICE_CODES = exports.SERVICE_API_CODES = exports.COMMANDS = exports.CARRIER_NAME = exports.TRACKING_URL = exports.CARRIER_URL = exports.TEST_URL = exports.CarrierOperation = void 0;
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
exports.CARRIER_NAME = "ProCarrier";
exports.COMMANDS = Object.freeze({
    OrderShipments: 'OrderShipment',
    GetShipment: 'GetShipmentInvoice',
    VoidShipment: 'VoidShipment',
    TrackShipment: 'TrackShipment'
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
exports.SERVICE_CODES = [
    exports.SERVICE_API_CODES.ProCarrierParcelPacket,
    exports.SERVICE_API_CODES.ProCarrierParcelExpress,
    exports.SERVICE_API_CODES.ProCarrierParcelPlus,
    exports.SERVICE_API_CODES.ProCarrierParcelPost,
];
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
var MaximumWeight;
(function (MaximumWeight) {
    MaximumWeight[MaximumWeight["ProCarrierParcelPacket"] = 2] = "ProCarrierParcelPacket";
    MaximumWeight[MaximumWeight["ProCarrierParcelExpress"] = 30] = "ProCarrierParcelExpress";
    MaximumWeight[MaximumWeight["ProCarrierParcelPost"] = 30] = "ProCarrierParcelPost";
    MaximumWeight[MaximumWeight["ProCarrierParcelPlus"] = 30] = "ProCarrierParcelPlus";
})(MaximumWeight || (exports.MaximumWeight = MaximumWeight = {}));
var MaximumLength;
(function (MaximumLength) {
    MaximumLength[MaximumLength["ProCarrierParcelPacket"] = 60] = "ProCarrierParcelPacket";
    MaximumLength[MaximumLength["ProCarrierParcelExpress"] = 120] = "ProCarrierParcelExpress";
    MaximumLength[MaximumLength["ProCarrierParcelPost"] = 150] = "ProCarrierParcelPost";
    MaximumLength[MaximumLength["ProCarrierParcelPlus"] = 120] = "ProCarrierParcelPlus";
})(MaximumLength || (exports.MaximumLength = MaximumLength = {}));
var MaximumSum;
(function (MaximumSum) {
    MaximumSum[MaximumSum["ProCarrierParcelPacket"] = 90] = "ProCarrierParcelPacket";
    MaximumSum[MaximumSum["ProCarrierParcelExpress"] = 180] = "ProCarrierParcelExpress";
    MaximumSum[MaximumSum["ProCarrierParcelPlus"] = 150] = "ProCarrierParcelPlus";
})(MaximumSum || (exports.MaximumSum = MaximumSum = {}));
var MaximumGirth;
(function (MaximumGirth) {
    MaximumGirth[MaximumGirth["ProCarrierParcelExpress"] = 440] = "ProCarrierParcelExpress";
    MaximumGirth[MaximumGirth["ProCarrierParcelPost"] = 300] = "ProCarrierParcelPost";
})(MaximumGirth || (exports.MaximumGirth = MaximumGirth = {}));
exports.ONE_POUND = 0.45;
//# sourceMappingURL=constants.js.map