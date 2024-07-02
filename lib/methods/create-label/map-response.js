"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const mapResponse = (orderShipment, metadata, getShipmentInvoice) => {
    var _a, _b, _c;
    const documents = (getShipmentInvoice === null || getShipmentInvoice === void 0 ? void 0 : getShipmentInvoice.Shipment) ? [
        {
            format: connect_carrier_api_1.DocumentFormat.Pdf,
            type: [connect_carrier_api_1.DocumentType.CommercialInvoice],
            data: (_a = getShipmentInvoice === null || getShipmentInvoice === void 0 ? void 0 : getShipmentInvoice.Shipment) === null || _a === void 0 ? void 0 : _a.LabelImage
        }
    ] : [];
    const packages = [
        {
            tracking_number: orderShipment.Shipment.TrackingNumber,
            documents: [
                {
                    format: getDocuments((_b = orderShipment === null || orderShipment === void 0 ? void 0 : orderShipment.Shipment) === null || _b === void 0 ? void 0 : _b.LabelFormat),
                    type: [connect_carrier_api_1.DocumentType.Label],
                    data: orderShipment.Shipment.LabelImage,
                }
            ]
        }
    ];
    return {
        transaction_id: "",
        tracking_number: (_c = orderShipment === null || orderShipment === void 0 ? void 0 : orderShipment.Shipment) === null || _c === void 0 ? void 0 : _c.TrackingNumber,
        documents: documents,
        trackable: true,
        packages: packages,
        metadata: metadata
    };
};
exports.mapResponse = mapResponse;
const getDocuments = (label_format) => {
    switch (label_format) {
        case 'zpl':
            return connect_carrier_api_1.DocumentFormat.Zpl;
        case 'png':
            return connect_carrier_api_1.DocumentFormat.Png;
        default:
            return connect_carrier_api_1.DocumentFormat.Pdf;
    }
};
//# sourceMappingURL=map-response.js.map