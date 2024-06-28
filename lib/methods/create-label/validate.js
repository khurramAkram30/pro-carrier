"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const terms_of_trade_code_1 = require("@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code");
const connect_runtime_1 = require("@shipengine/connect-runtime");
const constants_1 = require("../../helpers/constants");
const validate = (request) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (((_a = request === null || request === void 0 ? void 0 : request.packages) === null || _a === void 0 ? void 0 : _a.length) > 1) {
        throw new connect_runtime_1.BadRequestError("multipackage not supported");
    }
    if ((request === null || request === void 0 ? void 0 : request.service_code) === constants_1.SERVICE_API_CODES.ProCarrierParcelPlus) {
        if (((_c = (_b = request === null || request === void 0 ? void 0 : request.packages) === null || _b === void 0 ? void 0 : _b[0].customs) === null || _c === void 0 ? void 0 : _c.terms_of_trade_code) !== terms_of_trade_code_1.TermsOfTradeCode.DDP) {
            throw new connect_runtime_1.BadRequestError("Only DDP is allowed");
        }
    }
    else {
        if (((_e = (_d = request === null || request === void 0 ? void 0 : request.packages) === null || _d === void 0 ? void 0 : _d[0].customs) === null || _e === void 0 ? void 0 : _e.terms_of_trade_code.toLowerCase()) !== terms_of_trade_code_1.TermsOfTradeCode.DDP ||
            ((_g = (_f = request === null || request === void 0 ? void 0 : request.packages) === null || _f === void 0 ? void 0 : _f[0].customs) === null || _g === void 0 ? void 0 : _g.terms_of_trade_code.toLowerCase()) !== terms_of_trade_code_1.TermsOfTradeCode.DDU) {
            throw new connect_runtime_1.BadRequestError("Only DDP and DDU are valid for terms_of_trade_code");
        }
    }
    if (!((_h = request === null || request === void 0 ? void 0 : request.ship_from) === null || _h === void 0 ? void 0 : _h.country_code)) {
        throw new connect_runtime_1.BadRequestError("ShipFrom.Countrycode: It is mandatory");
    }
    if ((_l = (_k = (_j = request.packages) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.customs) === null || _l === void 0 ? void 0 : _l.customs_items) {
        const customItems = (_p = (_o = (_m = request.packages) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.customs) === null || _p === void 0 ? void 0 : _p.customs_items;
        customItems.forEach((items) => {
            if (parseInt(items.value.amount) < 0) {
                throw new connect_runtime_1.BadRequestError("Custom items amount must be positive integer.");
            }
        });
    }
    if ((request === null || request === void 0 ? void 0 : request.service_code) === constants_1.SERVICE_API_CODES.ProCarrierParcelPacket) {
        ValidatePackage(request);
    }
    if ((request === null || request === void 0 ? void 0 : request.service_code) === constants_1.SERVICE_API_CODES.ProCarrierParcelExpress) {
        ValidatePackage(request);
    }
    if ((request === null || request === void 0 ? void 0 : request.service_code) === constants_1.SERVICE_API_CODES.ProCarrierParcelPlus) {
        ValidatePackage(request);
    }
    if ((request === null || request === void 0 ? void 0 : request.service_code) === constants_1.SERVICE_API_CODES.ProCarrierParcelPost) {
        ValidatePackage(request);
    }
};
exports.validate = validate;
const ValidatePackage = (request) => {
    var _a;
    if ((_a = request === null || request === void 0 ? void 0 : request.packages) === null || _a === void 0 ? void 0 : _a[0]) {
        HandleWeightAndDimension(request.packages[0], request.service_code);
    }
};
const HandleWeightAndDimension = (request, ser_code) => {
    var _a, _b, _c;
    if (((_a = request === null || request === void 0 ? void 0 : request.weight_details) === null || _a === void 0 ? void 0 : _a.source_weight) &&
        ((_b = request === null || request === void 0 ? void 0 : request.weight_details) === null || _b === void 0 ? void 0 : _b.source_weight_unit)) {
        const sourceWeight = request.weight_details.source_weight;
        const sourceWeightUnit = request.weight_details.source_weight_unit;
        ValidateWeight(sourceWeight, sourceWeightUnit, constants_1.MaximumWeight.ProCarrierParcelPacket);
    }
    if ((_c = request === null || request === void 0 ? void 0 : request.dimension_details) === null || _c === void 0 ? void 0 : _c.dimensions_in_centimeters) {
        validateDimension(request === null || request === void 0 ? void 0 : request.dimension_details.dimensions_in_centimeters, constants_1.MaximumLength.ProCarrierParcelPacket, ser_code);
    }
};
const ValidateWeight = (sourceWeight, sourceWeightUnit, maximumWeight) => {
    if (sourceWeightUnit === connect_carrier_api_1.WeightUnit.Kilograms && sourceWeight > maximumWeight) {
        throw new connect_runtime_1.BadRequestError("Exceed Weight Limit");
    }
    if (sourceWeightUnit === connect_carrier_api_1.WeightUnit.Pounds) {
        const convertToKg = constants_1.ONE_POUND * sourceWeight;
        ValidateWeight(Number(convertToKg), connect_carrier_api_1.WeightUnit.Kilograms, maximumWeight);
    }
};
const validateDimension = (dimension, maxLength, service_code) => {
    const height = dimension === null || dimension === void 0 ? void 0 : dimension.height;
    const width = dimension === null || dimension === void 0 ? void 0 : dimension.width;
    const length = dimension === null || dimension === void 0 ? void 0 : dimension.length;
    const girth = width + height * 2;
    const sum = height + width + length;
    if (length > maxLength) {
        throw new connect_runtime_1.BadRequestError("Exceed the Limit of Length");
    }
    if (service_code === constants_1.SERVICE_API_CODES.ProCarrierParcelPost) {
        if (girth > constants_1.MaximumGirth.ProCarrierParcelPost) {
            throw new connect_runtime_1.BadRequestError("Exceed the Limit of girth");
        }
    }
    if (service_code === constants_1.SERVICE_API_CODES.ProCarrierParcelExpress) {
        if (girth > constants_1.MaximumGirth.ProCarrierParcelPost) {
            throw new connect_runtime_1.BadRequestError("Exceed the Limit of girth");
        }
        if (sum > constants_1.MaximumSum.ProCarrierParcelExpress) {
            throw new connect_runtime_1.BadRequestError(`Maximum Limit of L+H+W: ${constants_1.MaximumSum.ProCarrierParcelExpress}`);
        }
    }
    if (service_code === constants_1.SERVICE_API_CODES.ProCarrierParcelPacket ||
        service_code === constants_1.SERVICE_API_CODES.ProCarrierParcelPlus) {
        if (sum > constants_1.MaximumSum.ProCarrierParcelExpress) {
            throw new connect_runtime_1.BadRequestError(`Maximum Limit of L+H+W: ${constants_1.MaximumSum.ProCarrierParcelExpress}`);
        }
    }
};
//# sourceMappingURL=validate.js.map