export interface IGetShipmentInvoiceRequest {
    Apikey: string;
    Command: string;
    Shipment: GetShipments; 
}

export interface GetShipments {
    LabelFormat: string;
    TrackingNumber: string;
    ShipperReference?: string;
}