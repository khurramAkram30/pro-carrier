
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
    ProCarrierParcelPacket: 'PCPT',
    ProCarrierParcelPacketInternational: 'PCPT',
    ProCarrierParcelExpress: 'PCPE',
    ProCarrierParcelExpressInternational: 'PCPE',
    ProCarrierParcelPlus: 'PCPL',
    ProCarrierParcelPlusInternational: 'PCPL',
    ProCarrierParcelPost: 'PCPP',
    ProCarrierParcelPostInternational: 'PCPP'
});

export const CUSTOM_CONTENTS = Object.freeze({
    Sample: 'sample',
    CommercialSample: 'CommercialSample',
    Document: 'documents',
    gift: 'gift',
    other: 'other',
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

export enum MaximumSum {
    ProCarrierParcelPacket = 90,
    ProCarrierParcelExpress = 180,
    ProCarrierParcelPlus = 150
}

export enum MaximumGirth {
    ProCarrierParcelExpress = 440,
    ProCarrierParcelPost = 300
}


export const ONE_POUND: number = 0.45;