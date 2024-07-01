import { ICreateLabelResponse } from "./create-label-response";

export interface IGetShipmentInvoiceRequest {
    Apikey: string;
    Command: string;
    Shipment: GetShipments; 
}

export interface GetShipments {
    LabelFormat?: string;
    TrackingNumber: string;
    ShipperReference?: string;
}

export interface IGetShipmentResponse extends ICreateLabelResponse {
    
}