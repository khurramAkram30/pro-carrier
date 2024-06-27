export interface ICreateLabelResponse {
    ErrorLevel: number;
    Shipment: IShipment;
}
interface IShipment {
    TrackingNumber: string;
    ShipperReference: string;
    DisplayId: string;
    Service: string;
    Carrier: string;
    CarrierTrackingNumber: string;
    CarrierLocalTrackingNumber: string;
    CarrierBarcodeNumber: string;
    CarrierTrackingUrl: string;
    LabelFormat: string;
    LabelType: string;
    LabelImage: string
}