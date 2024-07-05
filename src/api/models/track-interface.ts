import { ICreateLabelResponse } from "./create-label-response";
import { IGetShipmentInvoiceRequest } from "./get-shipment-interface";

export interface ITrackRequest extends IGetShipmentInvoiceRequest{

}

export interface ITrackResponse {
   ErrorLevel: number;
   Shipment: ITrackShipment;
}
interface ITrackShipment {
    Id?: string;
    TrackingNumber: string;
    ShipperReference?: string;
    DisplayId?: string;
    Service?: string;
    Carrier?: string;
    CarrierTrackingNumber?: string;
    CarrierLocalTrackingNumber?: string;
    CarrierBarcodeNumber?: string;
    CarrierTrackingUrl?: string;
    LabelFormat?: string;
    LabelType?: string;
    LabelImage?: string;
    Weight: number;
    WeightUnit: string;
    ShipperAddress: ITrackAddress;
    ConsigneeAddress: ITrackAddress;
    Events: ITrackEvents[];
}

export interface ITrackAddress {
    Name: string;
    Company: string;
    City: string;
    Zip: string;
    Country: string 
}
export interface ITrackEvents {
    DateTime: string;
    Country: string;
    Code: string;
    Description: string;
    CarrierCode: string;
    CarrierDescription: string
}