"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRACKING_URL = exports.CARRIER_URL = exports.TEST_URL = exports.CarrierOperation = void 0;
var CarrierOperation;
(function (CarrierOperation) {
    CarrierOperation["Register"] = "Register";
    CarrierOperation["CreateLabel"] = "CreateLabel";
    CarrierOperation["VoidLabel"] = "VoidLabel";
    CarrierOperation["Track"] = "Track";
})(CarrierOperation || (exports.CarrierOperation = CarrierOperation = {}));
exports.TEST_URL = 'https://dgapi.app/API/?testMode=1';
exports.CARRIER_URL = 'https://weareprocarrier.com/';
exports.TRACKING_URL = 'https://tracking.weareprocarrier.com/?tn=[track_number]';
//# sourceMappingURL=constants.js.map