"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidLabelMapping = exports.getShipmentError = exports.mapGetShipmentInvoiceRequest = exports.isInternationals = exports.mapRequest = void 0;
const constants_1 = require("../../helpers/constants");
const utils_1 = require("../../helpers/utils");
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const terms_of_trade_code_1 = require("@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code");
const uuid_1 = require("uuid");
const void_label_1 = require("../void-label/void-label");
const mapRequest = (request) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: orderShipment(request)
    };
};
exports.mapRequest = mapRequest;
const isInternationals = (request) => {
    const shipTo = request === null || request === void 0 ? void 0 : request.ship_to;
    const shipFrom = request === null || request === void 0 ? void 0 : request.ship_from;
    if (shipTo.country_code !== shipFrom.country_code) {
        return true;
    }
    else {
        return false;
    }
};
exports.isInternationals = isInternationals;
const mapGetShipmentInvoiceRequest = (request, response) => {
    return {
        url: constants_1.TEST_URL,
        method: "POST",
        data: getShipmentInvoice(request, response)
    };
};
exports.mapGetShipmentInvoiceRequest = mapGetShipmentInvoiceRequest;
const getShipmentInvoice = (request, response) => {
    return {
        Apikey: (0, utils_1.getAuthentication)(request.metadata),
        Command: constants_1.CARRIER_METHODS.GetShipment,
        Shipment: getShipmentData(response)
    };
};
const getShipmentData = (response) => {
    return {
        LabelFormat: connect_carrier_api_1.LabelFormatsEnum.PDF,
        TrackingNumber: response.Shipment.TrackingNumber,
    };
};
const orderShipment = (data) => ({
    Apikey: (0, utils_1.getAuthentication)(data === null || data === void 0 ? void 0 : data.metadata),
    Command: constants_1.CARRIER_METHODS.OrderShipments,
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
        SenderAddress: (0, utils_1.getSenderAddress)(data === null || data === void 0 ? void 0 : data.ship_from),
        ConsigneeAddress: (0, utils_1.getConsigneeAddress)(data === null || data === void 0 ? void 0 : data.ship_to),
        Weight: (0, utils_1.getWeight)(packages),
        WeightUnit: (0, utils_1.getWeightUnit)(packages),
        Length: (_c = (_b = packages === null || packages === void 0 ? void 0 : packages.dimension_details) === null || _b === void 0 ? void 0 : _b.dimensions_in_centimeters) === null || _c === void 0 ? void 0 : _c.length,
        Width: (_e = (_d = packages === null || packages === void 0 ? void 0 : packages.dimension_details) === null || _d === void 0 ? void 0 : _d.dimensions_in_centimeters) === null || _e === void 0 ? void 0 : _e.width,
        Height: (_g = (_f = packages === null || packages === void 0 ? void 0 : packages.dimension_details) === null || _f === void 0 ? void 0 : _f.dimensions_in_centimeters) === null || _g === void 0 ? void 0 : _g.height,
        DimUnit: "cm",
        Value: getValue(packages === null || packages === void 0 ? void 0 : packages.customs),
        Currency: getCurrency(packages === null || packages === void 0 ? void 0 : packages.customs),
        CustomsDuty: getCustomsDuty(packages === null || packages === void 0 ? void 0 : packages.customs, data === null || data === void 0 ? void 0 : data.service_code),
        Description: packages === null || packages === void 0 ? void 0 : packages.content_description,
        DeclarationType: getDeclaration(packages === null || packages === void 0 ? void 0 : packages.customs),
        Products: getProducts(packages.customs),
    };
};
const getValue = (packageCustoms) => {
    var _a;
    const customItem = (_a = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.customs_items) !== null && _a !== void 0 ? _a : [];
    let totalValue = 0;
    customItem.map(items => {
        var _a, _b;
        totalValue += parseFloat((_a = items.value) === null || _a === void 0 ? void 0 : _a.amount) * ((_b = items.quantity) !== null && _b !== void 0 ? _b : 1);
    });
    return totalValue;
};
const getCurrency = (packageCustoms) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.customs_items[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.currency) !== null && _c !== void 0 ? _c : "GBP";
};
const getCustomsDuty = (packageCustoms, ser_code) => {
    var _a;
    const termsOfTradeCode = (_a = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.terms_of_trade_code) !== null && _a !== void 0 ? _a : "";
    if (termsOfTradeCode === terms_of_trade_code_1.TermsOfTradeCode.DDP) {
        return terms_of_trade_code_1.TermsOfTradeCode.DDP;
    }
    if ((ser_code === constants_1.SERVICE_API_CODES.ProCarrierParcelPlus) && (!termsOfTradeCode)) {
        return terms_of_trade_code_1.TermsOfTradeCode.DDP;
    }
    return terms_of_trade_code_1.TermsOfTradeCode.DDU;
};
const getDeclaration = (packageCustoms) => {
    var _a;
    const content = (_a = packageCustoms.contents.toLowerCase()) !== null && _a !== void 0 ? _a : "";
    if (content === connect_carrier_api_1.CustomsContentTypes.Documents) {
        return constants_1.CUSTOM_CONTENTS.Document;
    }
    if (content === connect_carrier_api_1.CustomsContentTypes.Sample) {
        return constants_1.CUSTOM_CONTENTS.CommercialSample;
    }
    if (content === connect_carrier_api_1.CustomsContentTypes.Gift) {
        return constants_1.CUSTOM_CONTENTS.gift;
    }
    if (content === connect_carrier_api_1.CustomsContentTypes.ReturnedGoods) {
        return constants_1.CUSTOM_CONTENTS.ReturnedGoods;
    }
    if (content === connect_carrier_api_1.CustomsContentTypes.Other) {
        return constants_1.CUSTOM_CONTENTS.Personal;
    }
    else {
        return constants_1.CUSTOM_CONTENTS.SaleOfGood;
    }
};
const getProducts = (packageCustoms) => {
    var _a;
    const content = (_a = packageCustoms === null || packageCustoms === void 0 ? void 0 : packageCustoms.customs_items) !== null && _a !== void 0 ? _a : [];
    let contentBody = [];
    content.forEach((customItem) => {
        var _a, _b;
        let itemQuantity = (_a = customItem === null || customItem === void 0 ? void 0 : customItem.quantity) !== null && _a !== void 0 ? _a : 1;
        let items = {
            Description: customItem === null || customItem === void 0 ? void 0 : customItem.description,
            Sku: customItem === null || customItem === void 0 ? void 0 : customItem.sku,
            HsCode: customItem === null || customItem === void 0 ? void 0 : customItem.harmonized_tariff_code,
            Quantity: itemQuantity,
            Value: itemQuantity * parseInt((_b = customItem === null || customItem === void 0 ? void 0 : customItem.value) === null || _b === void 0 ? void 0 : _b.amount),
            OriginCountry: customItem === null || customItem === void 0 ? void 0 : customItem.country_of_origin,
            PurchaseUrl: customItem === null || customItem === void 0 ? void 0 : customItem.product_url
        };
        contentBody.push(items);
    });
    return contentBody;
};
const getShipmentError = (request, ShipFrom, metadata) => {
    const trackingNumber = request.Shipment.TrackingNumber;
    const voidLableReqMapping = (0, exports.VoidLabelMapping)(trackingNumber, ShipFrom, metadata);
    (0, void_label_1.VoidLabels)(voidLableReqMapping);
    (0, utils_1.HandleError)(request);
};
exports.getShipmentError = getShipmentError;
const VoidLabelMapping = (trackingNumber, shipFrom, metadata) => {
    return {
        transaction_id: "",
        void_requests: [
            {
                tracking_number: trackingNumber,
                void_request_id: (0, uuid_1.v4)(),
                ship_from: {
                    country_code: shipFrom.country_code,
                    postal_code: shipFrom.postal_code,
                },
            }
        ],
        metadata: metadata
    };
};
exports.VoidLabelMapping = VoidLabelMapping;
//# sourceMappingURL=map-request.js.map