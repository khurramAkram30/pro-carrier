
export enum CarrierOperation {
    Register = 'Register',
    CreateLabel = 'CreateLabel',
    VoidLabel = 'VoidLabel',
    Track = 'Track',
    GetShipment = 'GetShipment'

 }
export const TEST_URL = 'https://dgapi.app/API/?testMode=1';
export const CARRIER_URL = 'https://weareprocarrier.com/';
export const TRACKING_URL = 'https://tracking.weareprocarrier.com/?tn=[track_number]';

export const COMMANDS = Object.freeze ({
    OrderShipments: 'OrderShipment',
    GetShipment: 'GetShipmentInvoice',
    VoidShipment: 'VoidShipment'
});

export const SERVICE_API_CODES = Object.freeze({
    ProCarrierParcelPacket: "PCPT",
    ProCarrierParcelPacketInternational: "PCPT",
    ProCarrierParcelExpress: "PCPE",
    ProCarrierParcelExpressInternational: "PCPE",
    ProCarrierParcelPlus: "PCPL",
    ProCarrierParcelPlusInternational: "PCPL",
    ProCarrierParcelPost: "PCPP",
    ProCarrierParcelPostInternational: "PCPP"
});

export const WEIGHT_UNIT = Object.freeze({
    Pounds: "pounds",
    Kilogram: "kilogram"
});

export const TRADE_CODE = Object.freeze({
    DDP: "DDP",
    DDU: "DDU"
});

export const CUSTOM_CONTENTS = Object.freeze({
    Sample: "sample",
    CommercialSample: "CommercialSample",
    Document: "documents",
    gift: "gift",
    other: "other",
    Personal: "Personal",
    SaleOfGood: "SaleOfGood",
    returnedgoods: "returned_goods",
    ReturnedGoods: "ReturnedGoods"
})


