
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

export const Commands = Object.freeze ({
    OrderShipments: 'OrderShipment',
    GetShipment: 'GetShipmentInvoice',
    VoidShipment: 'VoidShipment'
});
