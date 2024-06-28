"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGetShipment = exports.isInternationalOrDomestic = exports.mapRequest = void 0;
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const terms_of_trade_code_1 = require("@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code");
const mapRequest = (request) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: orderShipment(request)
    };
};
exports.mapRequest = mapRequest;
const isInternationalOrDomestic = (request) => {
    const shipTo = request === null || request === void 0 ? void 0 : request.ship_to;
    const shipFrom = request === null || request === void 0 ? void 0 : request.ship_from;
    if (shipTo.country_code !== shipFrom.country_code) {
        return true;
    }
    else {
        return false;
    }
};
exports.isInternationalOrDomestic = isInternationalOrDomestic;
const mapGetShipment = (request, response) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: getShipmentInvoice(request, response)
    };
};
exports.mapGetShipment = mapGetShipment;
const getShipmentInvoice = (request, response) => {
    return {
        Apikey: (0, utils_1.getAuthentication)(request.metadata),
        Command: "GetShipmentInvoice",
        Shipment: getShipmentData(response)
    };
};
const getShipmentData = (response) => {
    return {
        LabelFormat: "PDF",
        TrackingNumber: response.Shipment.TrackingNumber,
    };
};
const orderShipment = (data) => ({
    Apikey: (0, utils_1.getAuthentication)(data === null || data === void 0 ? void 0 : data.metadata),
    Command: (0, utils_1.getCommand)(constants_1.CarrierOperation.CreateLabel),
    Shipment: getOrderShipment(data)
});
const getOrderShipment = (data) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const packages = data === null || data === void 0 ? void 0 : data.packages[0];
    return {
        RequireCarrierTrackingNumber: true,
        LabelOption: "System",
        LabelFormat: (0, utils_1.getLabelFormat)(data.label_format),
        ShipperReference: (_a = packages === null || packages === void 0 ? void 0 : packages.label_messages) === null || _a === void 0 ? void 0 : _a.reference1,
        Service: data === null || data === void 0 ? void 0 : data.service_code,
        SenderAddress: (0, utils_1.getSenderAddress)(data.ship_from),
        ConsigneeAddress: (0, utils_1.getConsigneeAddress)(data === null || data === void 0 ? void 0 : data.ship_to),
        Weight: (0, utils_1.getWeight)(packages),
        WeightUnit: (0, utils_1.getWeightUnit)(packages),
        Length: (_c = (_b = packages === null || packages === void 0 ? void 0 : packages.dimension_details) === null || _b === void 0 ? void 0 : _b.dimensions_in_centimeters) === null || _c === void 0 ? void 0 : _c.length,
        Width: (_e = (_d = packages === null || packages === void 0 ? void 0 : packages.dimension_details) === null || _d === void 0 ? void 0 : _d.dimensions_in_centimeters) === null || _e === void 0 ? void 0 : _e.width,
        Height: (_g = (_f = packages === null || packages === void 0 ? void 0 : packages.dimension_details) === null || _f === void 0 ? void 0 : _f.dimensions_in_centimeters) === null || _g === void 0 ? void 0 : _g.height,
        DimUnit: "cm",
        Value: getCustoms(packages === null || packages === void 0 ? void 0 : packages.customs),
        Currency: getCurrency(packages === null || packages === void 0 ? void 0 : packages.customs),
        CustomsDuty: getCustomsDuty(packages === null || packages === void 0 ? void 0 : packages.customs, data === null || data === void 0 ? void 0 : data.service_code),
        Description: packages === null || packages === void 0 ? void 0 : packages.content_description,
        DeclarationType: getDeclaration(packages === null || packages === void 0 ? void 0 : packages.customs),
        Products: getProduct(packages.customs),
    };
};
const getCustoms = (packageCustoms) => {
    const customItem = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.customs_items;
    let totalValue = 0;
    customItem.map(items => {
        var _a;
        totalValue += parseFloat((_a = items.value) === null || _a === void 0 ? void 0 : _a.amount) * (items.quantity);
    });
    return totalValue;
};
const getCurrency = (packageCustoms) => {
    var _a, _b;
    const currency = (_b = (_a = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.customs_items[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.currency;
    if (currency) {
        return currency;
    }
    else {
        return "GBP";
    }
};
const getCustomsDuty = (packageCustoms, ser_code) => {
    var _a;
    const termsOfTradeCode = ((_a = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.terms_of_trade_code) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || "";
    if (termsOfTradeCode === terms_of_trade_code_1.TermsOfTradeCode.DDP) {
        return terms_of_trade_code_1.TermsOfTradeCode.DDP;
    }
    if ((ser_code.toUpperCase() === constants_1.SERVICE_API_CODES.ProCarrierParcelPlus || ser_code === constants_1.SERVICE_API_CODES.ProCarrierParcelPlusInternational) &&
        (!termsOfTradeCode)) {
        return terms_of_trade_code_1.TermsOfTradeCode.DDP;
    }
    else {
        return terms_of_trade_code_1.TermsOfTradeCode.DDU;
    }
};
const getDeclaration = (packageCustoms) => {
    const content = packageCustoms.contents.toLowerCase();
    if (content === constants_1.CUSTOM_CONTENTS.Document) {
        return constants_1.CUSTOM_CONTENTS.Document.charAt(0).toUpperCase();
    }
    if (content === constants_1.CUSTOM_CONTENTS.Sample) {
        return constants_1.CUSTOM_CONTENTS.CommercialSample;
    }
    if (content === constants_1.CUSTOM_CONTENTS.gift) {
        return constants_1.CUSTOM_CONTENTS.gift.charAt(0).toUpperCase();
    }
    if (content === constants_1.CUSTOM_CONTENTS.returnedgoods) {
        return constants_1.CUSTOM_CONTENTS.ReturnedGoods;
    }
    if (content === constants_1.CUSTOM_CONTENTS.other) {
        return constants_1.CUSTOM_CONTENTS.Personal;
    }
    else {
        return constants_1.CUSTOM_CONTENTS.SaleOfGood;
    }
};
const getProduct = (packageCustoms) => {
    const content = packageCustoms.customs_items;
    let contentBody = [];
    content.forEach((customItem) => {
        var _a;
        let itemQuantity = customItem === null || customItem === void 0 ? void 0 : customItem.quantity;
        let items = {
            Description: customItem === null || customItem === void 0 ? void 0 : customItem.description,
            Sku: customItem === null || customItem === void 0 ? void 0 : customItem.sku,
            HsCode: customItem === null || customItem === void 0 ? void 0 : customItem.harmonized_tariff_code,
            Quantity: itemQuantity,
            Value: itemQuantity * parseInt((_a = customItem === null || customItem === void 0 ? void 0 : customItem.value) === null || _a === void 0 ? void 0 : _a.amount),
            OriginCountry: customItem === null || customItem === void 0 ? void 0 : customItem.country_of_origin,
            PurchaseUrl: customItem === null || customItem === void 0 ? void 0 : customItem.product_url
        };
        contentBody.push(items);
    });
    return contentBody;
};
//# sourceMappingURL=map-request.js.map