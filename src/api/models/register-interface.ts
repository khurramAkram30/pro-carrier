
export interface IRegisterRequest {
    Apikey: string;
    Command: string;
    Shipment:  ShipmentMetadata
} 

interface ShipmentMetadata {
    LabelOption : string;
    ShipperReference?: string
}