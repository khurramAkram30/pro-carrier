import { LabelFormatsEnum } from "@shipengine/connect-carrier-api";
import * as services  from '../../definitions/services';

export interface CreateLabelReq {
    ApiKey: string;
    Command: string;
    Shipments:Shipments
}
interface Shipments {
    RequireCarrierTrackingNumber: boolean,
    LabelOption: string;
    LabelFormat: string;
    Service: string;
    SenderAddress: Address;
    ConsigneeAddress: Address;
    Weight: number;
    WeightUnit: string;
    Length: number;
    Width: number;
    Height: number;
    DimUnit: number;

}   
interface Address {
    Name: string;
    Company: string;
    AddressLine1: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;
    Phone: number;
    Email: string;
    Vat: number,
    Eori?: number;
    Ioss?: number
}