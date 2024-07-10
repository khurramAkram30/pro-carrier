"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaximumLength = exports.getMaximumWeight = exports.validateDimension = exports.ValidateWeight = exports.validate = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const terms_of_trade_code_1 = require("@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code");
const connect_runtime_1 = require("@shipengine/connect-runtime");
const constants_1 = require("../../helpers/constants");
const validate = (request) => {
    var _a, _b, _c, _d, _e, _f;
    const termsOfTradeCode = (_b = (_a = request === null || request === void 0 ? void 0 : request.packages) === null || _a === void 0 ? void 0 : _a[0].customs) === null || _b === void 0 ? void 0 : _b.terms_of_trade_code.toLowerCase();
    const customItems = (_e = (_d = (_c = request.packages) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.customs) === null || _e === void 0 ? void 0 : _e.customs_items;
    if ((request === null || request === void 0 ? void 0 : request.service_code) === constants_1.SERVICE_API_CODES.ProCarrierParcelPlus) {
        if (termsOfTradeCode !== terms_of_trade_code_1.TermsOfTradeCode.DDP) {
            throw new connect_runtime_1.BadRequestError(`Only DDP is allowed for this service: ${constants_1.SERVICE_API_CODES.ProCarrierParcelPlus}`);
        }
    }
    else {
        if (termsOfTradeCode != terms_of_trade_code_1.TermsOfTradeCode.DDU && termsOfTradeCode != terms_of_trade_code_1.TermsOfTradeCode.DDP) {
            throw new connect_runtime_1.BadRequestError("Only DDP and DDU are valid for terms of trade code");
        }
    }
    if (customItems) {
        customItems.forEach((items) => {
            if (parseInt(items.value.amount) <= 0) {
                throw new connect_runtime_1.BadRequestError("Custom items amount must be present");
            }
        });
    }
    if ((_f = request === null || request === void 0 ? void 0 : request.packages) === null || _f === void 0 ? void 0 : _f[0]) {
        HandleWeightAndDimension(request.packages[0], request.service_code);
    }
};
exports.validate = validate;
const HandleWeightAndDimension = (request, serviceCode) => {
    var _a, _b, _c;
    if (((_a = request === null || request === void 0 ? void 0 : request.weight_details) === null || _a === void 0 ? void 0 : _a.source_weight) &&
        ((_b = request === null || request === void 0 ? void 0 : request.weight_details) === null || _b === void 0 ? void 0 : _b.source_weight_unit)) {
        (0, exports.ValidateWeight)(request.weight_details.source_weight, request.weight_details.source_weight_unit, (0, exports.getMaximumWeight)(serviceCode));
    }
    if ((_c = request === null || request === void 0 ? void 0 : request.dimension_details) === null || _c === void 0 ? void 0 : _c.dimensions_in_centimeters) {
        (0, exports.validateDimension)(request === null || request === void 0 ? void 0 : request.dimension_details.dimensions_in_centimeters, (0, exports.getMaximumLength)(serviceCode), serviceCode);
    }
};
const ValidateWeight = (sourceWeight, sourceWeightUnit, maximumWeight) => {
    if (sourceWeightUnit === connect_carrier_api_1.WeightUnit.Kilograms && sourceWeight > maximumWeight) {
        throw new connect_runtime_1.BadRequestError("Exceed Weight Limit");
    }
    if (sourceWeightUnit === connect_carrier_api_1.WeightUnit.Pounds) {
        const convertToKg = constants_1.ONE_POUND * sourceWeight;
        (0, exports.ValidateWeight)(Number(convertToKg), connect_carrier_api_1.WeightUnit.Kilograms, maximumWeight);
    }
};
exports.ValidateWeight = ValidateWeight;
const validateDimension = (dimension, maxLength, serviceCode) => {
    const height = (dimension === null || dimension === void 0 ? void 0 : dimension.height) || 0;
    const width = (dimension === null || dimension === void 0 ? void 0 : dimension.width) || 0;
    const length = (dimension === null || dimension === void 0 ? void 0 : dimension.length) || 0;
    const girth = width + height * 2;
    const sum = height + width + length;
    if (length > maxLength) {
        throw new connect_runtime_1.BadRequestError("Exceed the Limit of Length");
    }
    switch (serviceCode) {
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPost:
            valaidateGirth(girth, constants_1.MaximumGirth.ProCarrierParcelPost);
            break;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelExpress:
            valaidateGirth(girth, constants_1.MaximumGirth.ProCarrierParcelExpress);
            valaidateSum(sum, constants_1.MaximumDimensionSum.ProCarrierParcelExpress);
            break;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPacket:
            valaidateSum(sum, constants_1.MaximumDimensionSum.ProCarrierParcelPacket);
            break;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPlus:
            valaidateSum(sum, constants_1.MaximumDimensionSum.ProCarrierParcelPlus);
            break;
        default:
            break;
    }
};
exports.validateDimension = validateDimension;
const valaidateSum = (totalSum, maximumSum) => {
    if (totalSum > maximumSum) {
        throw new connect_runtime_1.BadRequestError("Exceed the Limit of girth");
    }
};
const valaidateGirth = (girth, maximumGirth) => {
    if (girth > maximumGirth) {
        throw new connect_runtime_1.BadRequestError("Exceed the Limit of girth");
    }
};
const getMaximumWeight = (serviceCode) => {
    switch (serviceCode) {
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPacket:
            return constants_1.MaximumWeight.ProCarrierParcelPacket;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelExpress:
            return constants_1.MaximumWeight.ProCarrierParcelExpress;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPlus:
            return constants_1.MaximumWeight.ProCarrierParcelPlus;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPost:
            return constants_1.MaximumWeight.ProCarrierParcelPost;
        default:
    }
};
exports.getMaximumWeight = getMaximumWeight;
const getMaximumLength = (serviceCode) => {
    switch (serviceCode) {
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPacket:
            return constants_1.MaximumLength.ProCarrierParcelPacket;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelExpress:
            return constants_1.MaximumLength.ProCarrierParcelExpress;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPlus:
            return constants_1.MaximumLength.ProCarrierParcelPlus;
        case constants_1.SERVICE_API_CODES.ProCarrierParcelPost:
            return constants_1.MaximumLength.ProCarrierParcelPost;
        default:
    }
};
exports.getMaximumLength = getMaximumLength;
//# sourceMappingURL=validate.js.map