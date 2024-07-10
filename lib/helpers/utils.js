"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = exports.checkCarrierError = exports.getIdentifierValue = exports.getLabelFormat = exports.getWeightUnit = exports.getWeight = exports.getName = exports.getAddress = exports.getConsigneeAddress = exports.getSenderAddress = exports.getAuthentication = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const getAuthentication = (data) => {
    var _a;
    const metaData = data !== null && data !== void 0 ? data : {};
    return (_a = metaData === null || metaData === void 0 ? void 0 : metaData.api_key) !== null && _a !== void 0 ? _a : "";
};
exports.getAuthentication = getAuthentication;
const getSenderAddress = (shipFrom) => {
    return Object.assign(Object.assign({}, (0, exports.getAddress)(shipFrom)), { Vat: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.VAT), Eori: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.EORI), Ioss: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.IOSS) });
};
exports.getSenderAddress = getSenderAddress;
const getConsigneeAddress = (shipTo) => {
    return Object.assign(Object.assign({}, (0, exports.getAddress)(shipTo)), { Vat: getTaxIdentifierId(shipTo === null || shipTo === void 0 ? void 0 : shipTo.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.VAT) });
};
exports.getConsigneeAddress = getConsigneeAddress;
const getTaxIdentifierId = (data, type) => {
    var _a, _b;
    const ti = data || [];
    return (_b = (_a = ti.find(TaxIdentifier => TaxIdentifier.type.toLowerCase() === type)) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '';
};
const getAddress = (address) => {
    var _a;
    const addressLines = (_a = address.address_lines) !== null && _a !== void 0 ? _a : [];
    const mappedAddress = {
        Name: (0, exports.getName)(address),
        Company: address === null || address === void 0 ? void 0 : address.company_name,
        AddressLine1: addressLines[0],
        AddressLine2: addressLines[1],
        AddressLine3: addressLines[2],
        City: address === null || address === void 0 ? void 0 : address.city_locality,
        State: address === null || address === void 0 ? void 0 : address.state_province,
        Zip: address === null || address === void 0 ? void 0 : address.postal_code,
        Country: address === null || address === void 0 ? void 0 : address.country_code,
        Email: address === null || address === void 0 ? void 0 : address.email,
        Phone: address === null || address === void 0 ? void 0 : address.phone_number,
    };
    return mappedAddress;
};
exports.getAddress = getAddress;
const getName = (address) => {
    if (address === null || address === void 0 ? void 0 : address.name) {
        return address.name;
    }
    else {
        const firstName = (address === null || address === void 0 ? void 0 : address.first_name) || "";
        const lastName = (address === null || address === void 0 ? void 0 : address.last_name) || "";
        return firstName + " " + lastName;
    }
};
exports.getName = getName;
const getWeight = (pkg) => {
    var _a;
    const weightDetaiils = (pkg === null || pkg === void 0 ? void 0 : pkg.weight_details) || null;
    if ((weightDetaiils === null || weightDetaiils === void 0 ? void 0 : weightDetaiils.source_weight_unit) === connect_carrier_api_1.WeightUnit.Pounds || (weightDetaiils === null || weightDetaiils === void 0 ? void 0 : weightDetaiils.source_weight_unit) === connect_carrier_api_1.WeightUnit.Kilograms) {
        return pkg.weight_details.source_weight;
    }
    return ((_a = pkg === null || pkg === void 0 ? void 0 : pkg.weight_details) === null || _a === void 0 ? void 0 : _a.weight_in_grams) / 1000;
};
exports.getWeight = getWeight;
const getWeightUnit = (pkg) => {
    var _a;
    if (((_a = pkg === null || pkg === void 0 ? void 0 : pkg.weight_details) === null || _a === void 0 ? void 0 : _a.source_weight_unit) === connect_carrier_api_1.WeightUnit.Pounds) {
        return "lb";
    }
    return "kg";
};
exports.getWeightUnit = getWeightUnit;
const getLabelFormat = (label_format) => {
    return label_format === connect_carrier_api_1.LabelFormatsEnum.ZPL ? "ZPL200" : label_format !== null && label_format !== void 0 ? label_format : connect_carrier_api_1.LabelFormatsEnum.PDF;
};
exports.getLabelFormat = getLabelFormat;
const getIdentifierValue = (request, type) => {
    var _a;
    return (_a = request.identifiers.find(p => p.type === type)) === null || _a === void 0 ? void 0 : _a.value;
};
exports.getIdentifierValue = getIdentifierValue;
const checkCarrierError = (error) => {
    if ((error === null || error === void 0 ? void 0 : error.Error) === "Access Denied") {
        throw new connect_runtime_1.UnauthorizedError(`Error from Carrier Api: Error Code: ${error.ErrorLevel} , Error Message: ${error.Error}`);
    }
};
exports.checkCarrierError = checkCarrierError;
const HandleError = (error) => {
    const ErrorDetail = [];
    if (error === null || error === void 0 ? void 0 : error.Error) {
        ErrorDetail.push({
            errorCode: error === null || error === void 0 ? void 0 : error.ErrorLevel,
            message: "Error Received From API: " + "Error Code: " + (error === null || error === void 0 ? void 0 : error.ErrorLevel) + ", " + "Error Message: " + (error === null || error === void 0 ? void 0 : error.Error)
        });
        throw new connect_runtime_1.ExternalServerError(ErrorDetail[0].message);
    }
};
exports.HandleError = HandleError;
//# sourceMappingURL=utils.js.map