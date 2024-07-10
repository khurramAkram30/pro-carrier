
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
export const CARRIER_NAME = "ProCarrier";

export const CARRIER_METHODS = Object.freeze({
    OrderShipments: 'OrderShipment',
    GetShipment: 'GetShipmentInvoice',
    VoidShipment: 'VoidShipment',
    TrackShipment: 'TrackShipment'
});

export const SERVICE_API_CODES = Object.freeze({
    ProCarrierParcelPacket: 'PCPT',
    ProCarrierParcelPacketInternational: 'PCPT',
    ProCarrierParcelExpress: 'PCPE',
    ProCarrierParcelExpressInternational: 'PCPE',
    ProCarrierParcelPlus: 'PCPL',
    ProCarrierParcelPlusInternational: 'PCPL',
    ProCarrierParcelPost: 'PCPP',
    ProCarrierParcelPostInternational: 'PCPP'
});

export const SERVICE_CODES = [
    {"serviceCode": SERVICE_API_CODES.ProCarrierParcelPacket},
    {"serviceCode": SERVICE_API_CODES.ProCarrierParcelExpress},
    {"serviceCode": SERVICE_API_CODES.ProCarrierParcelPlus},
    {"serviceCode": SERVICE_API_CODES.ProCarrierParcelPost}
];


export const CUSTOM_CONTENTS = Object.freeze({
    Sample: 'Sample',
    CommercialSample: 'CommercialSample',
    Document: 'Documents',
    gift: 'Gift',
    other: 'Other',
    Personal: 'Personal',
    SaleOfGood: 'SaleOfGood',
    returnedgoods: 'returned_goods',
    ReturnedGoods: 'ReturnedGoods'
})

export enum MaximumWeight {
    ProCarrierParcelPacket = 2,
    ProCarrierParcelExpress = 30,
    ProCarrierParcelPost = 30,
    ProCarrierParcelPlus = 30
}

export enum MaximumLength {
    ProCarrierParcelPacket = 60,
    ProCarrierParcelExpress = 120,
    ProCarrierParcelPost = 150,
    ProCarrierParcelPlus = 120
}

export enum MaximumDimensionSum {
    ProCarrierParcelPacket = 90,
    ProCarrierParcelExpress = 180,
    ProCarrierParcelPlus = 150
}

export enum MaximumGirth {
    ProCarrierParcelExpress = 440,
    ProCarrierParcelPost = 300
}


export const ONE_POUND: number = 0.45;