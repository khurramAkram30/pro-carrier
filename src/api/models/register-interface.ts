
export interface IRegisterRequest {
    Apikey: string;
    Command: 'OrderShipment';
    Shipment:  ShipmentMetadata
} 

interface ShipmentMetadata {
    LabelOption : "LabelOption";
    ShipperReference?: string
}