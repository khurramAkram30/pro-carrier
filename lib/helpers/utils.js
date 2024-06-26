"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlesError = exports.getCustomError = exports.getLabelFormat = exports.getWeightUnit = exports.getWeight = exports.getAddress = exports.getConsigneeAddress = exports.getSenderAddress = exports.getName = exports.getCommand = exports.getAuthentication = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const axios_1 = require("axios");
const constants_1 = require("./constants");
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const getAuthentication = (data) => {
    return data === null || data === void 0 ? void 0 : data.api_key;
};
exports.getAuthentication = getAuthentication;
const getCommand = (data) => {
    const command = data;
    switch (command) {
        case constants_1.CarrierOperation.CreateLabel:
            return constants_1.COMMANDS.OrderShipments;
            break;
        case constants_1.CarrierOperation.GetShipment:
            return constants_1.COMMANDS.GetShipment;
            break;
    }
};
exports.getCommand = getCommand;
const getName = (address) => {
    const firstName = address === null || address === void 0 ? void 0 : address.first_name;
    const lastName = address === null || address === void 0 ? void 0 : address.last_name;
    if (address === null || address === void 0 ? void 0 : address.name) {
        return address.name;
    }
    else {
        return firstName + " " + lastName;
    }
};
exports.getName = getName;
const getSenderAddress = (shipFrom) => {
    return Object.assign(Object.assign({}, (0, exports.getAddress)(shipFrom)), { Vat: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.VAT), Eori: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.EORI), Ioss: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.IOSS) });
};
exports.getSenderAddress = getSenderAddress;
const getConsigneeAddress = (shipTo) => {
    return Object.assign(Object.assign({}, (0, exports.getAddress)(shipTo)), { Vat: getTaxIdentifierId(shipTo === null || shipTo === void 0 ? void 0 : shipTo.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.VAT) });
};
exports.getConsigneeAddress = getConsigneeAddress;
const getTaxIdentifierId = (data, type) => {
    var _a;
    return (_a = data.find(TaxIdentifier => TaxIdentifier.type.toLowerCase() === type)) === null || _a === void 0 ? void 0 : _a.id;
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
const getWeight = (pakg) => {
    if (pakg.weight_details.source_weight_unit === constants_1.WEIGHT_UNIT.Pounds) {
        return pakg.weight_details.source_weight;
    }
    else if (pakg.weight_details.source_weight_unit === constants_1.WEIGHT_UNIT.Kilogram) {
        return pakg.weight_details.source_weight;
    }
    else {
        return pakg.weight_details.weight_in_grams / 1000;
    }
};
exports.getWeight = getWeight;
const getWeightUnit = (pakg) => {
    if (pakg.weight_details.source_weight_unit = constants_1.WEIGHT_UNIT.Pounds) {
        return "lb";
    }
    else if (pakg.weight_details.source_weight_unit = constants_1.WEIGHT_UNIT.Kilogram) {
        return "kg";
    }
    else {
        return "kg";
    }
};
exports.getWeightUnit = getWeightUnit;
const getLabelFormat = (label_format) => {
    if (label_format === connect_carrier_api_1.LabelFormatsEnum.PDF) {
        return connect_carrier_api_1.LabelFormatsEnum.PDF;
    }
    if (label_format === connect_carrier_api_1.LabelFormatsEnum.PNG) {
        return connect_carrier_api_1.LabelFormatsEnum.PNG;
    }
    if (label_format === connect_carrier_api_1.LabelFormatsEnum.ZPL) {
        return "ZPL200";
    }
    else {
        return connect_carrier_api_1.LabelFormatsEnum.PDF;
    }
};
exports.getLabelFormat = getLabelFormat;
const getCustomError = (err) => {
    const customError = err.Error;
    if (customError === "Access Denied") {
        throw new connect_runtime_1.UnauthorizedError('Error from Carrier Api', [
            {
                errorCode: err.ErrorLevel,
                message: "Access denied"
            }
        ]);
    }
};
exports.getCustomError = getCustomError;
const HandlesError = (error) => {
    const errorCode = [];
    if (error === null || error === void 0 ? void 0 : error.details) {
        errorCode.push({
            errorCode: error.details[0].errorCode,
            message: error.details[0].message
        });
    }
    if (error.statusCode === axios_1.HttpStatusCode.Unauthorized) {
        throw new connect_runtime_1.UnauthorizedError("Message From Carrier Api", errorCode);
    }
};
exports.HandlesError = HandlesError;
//# sourceMappingURL=utils.js.map