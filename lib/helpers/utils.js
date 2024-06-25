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
    return {
        Name: (0, exports.getName)(shipFrom),
        Company: shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.company_name,
        Address: (0, exports.getAddress)(shipFrom),
        Email: shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.email,
        Phone: shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.phone_number,
        Vat: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.VAT),
        Eori: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.EORI),
        Ioss: getTaxIdentifierId(shipFrom === null || shipFrom === void 0 ? void 0 : shipFrom.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.IOSS),
    };
};
exports.getSenderAddress = getSenderAddress;
const getConsigneeAddress = (shipTo) => {
    return {
        Name: (0, exports.getName)(shipTo),
        Company: shipTo === null || shipTo === void 0 ? void 0 : shipTo.company_name,
        Address: (0, exports.getAddress)(shipTo),
        Email: shipTo === null || shipTo === void 0 ? void 0 : shipTo.email,
        Phone: shipTo === null || shipTo === void 0 ? void 0 : shipTo.phone_number,
        Vat: getTaxIdentifierId(shipTo === null || shipTo === void 0 ? void 0 : shipTo.tax_identifiers, connect_carrier_api_1.TaxIdentifierType.EORI),
    };
};
exports.getConsigneeAddress = getConsigneeAddress;
const getTaxIdentifierId = (data, type) => {
    var _a;
    const taxIdentifierValue = (_a = data.find((typecheck) => typecheck.type.toLowerCase() === type)) === null || _a === void 0 ? void 0 : _a.id;
    return taxIdentifierValue !== null && taxIdentifierValue !== void 0 ? taxIdentifierValue : "";
};
const getAddress = (Address) => {
    var _a, _b, _c, _d, _e, _f;
    return {
        AddressLine1: (_a = Address === null || Address === void 0 ? void 0 : Address.address_lines[0]) !== null && _a !== void 0 ? _a : "",
        AddressLine2: (_b = Address === null || Address === void 0 ? void 0 : Address.address_lines[1]) !== null && _b !== void 0 ? _b : "",
        AddressLine3: (_c = Address === null || Address === void 0 ? void 0 : Address.address_lines[2]) !== null && _c !== void 0 ? _c : "",
        City: (_d = Address === null || Address === void 0 ? void 0 : Address.city_locality) !== null && _d !== void 0 ? _d : "",
        State: (_e = Address === null || Address === void 0 ? void 0 : Address.state_province) !== null && _e !== void 0 ? _e : "",
        Zip: Address === null || Address === void 0 ? void 0 : Address.postal_code,
        Country: (_f = Address === null || Address === void 0 ? void 0 : Address.country_code) !== null && _f !== void 0 ? _f : "",
    };
};
exports.getAddress = getAddress;
const getWeight = (pakg) => {
    if (pakg[0].weight_details.source_weight_unit === constants_1.WEIGHT_UNIT.Pounds) {
        return pakg[0].weight_details.source_weight;
    }
    else if (pakg[0].weight_details.source_weight_unit === constants_1.WEIGHT_UNIT.Kilogram) {
        return pakg[0].weight_details.source_weight;
    }
    else {
        return pakg[0].weight_details.weight_in_grams / 1000;
    }
};
exports.getWeight = getWeight;
const getWeightUnit = (pakg) => {
    if (pakg[0].weight_details.source_weight_unit = constants_1.WEIGHT_UNIT.Pounds) {
        return "lb";
    }
    else if (pakg[0].weight_details.source_weight_unit = constants_1.WEIGHT_UNIT.Kilogram) {
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