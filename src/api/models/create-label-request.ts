export interface CreateLabelReq {
    Apikey: string;
    Command: string;
    Shipment: Shipments
}
export interface Shipments {
    RequireCarrierTrackingNumber?: boolean,
    LabelOption: string;
    LabelFormat: string;
    ShipperReference?: string;
    DisplayID?: string;
    Service: string;
    SenderAddress: Address;
    ConsigneeAddress: Address;
    Weight: number;
    WeightUnit: string;
    Length: number;
    Width: number;
    Height: number;
    DimUnit: string;
    Value: number;
    Currency: string;
    CustomsDuty: string;
    Description?: string;
    DeclarationType: string;
    Products: Products[];
}   

export interface Address {
    Name: string;
    Company?: string;
    AddressLine1: string;
    AddressLine2?: string;
    AddressLine3?: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;
    Phone: string;
    Email: string;
}
export interface SenderAddress extends Address {
    Vat: string;
    Eori: string;
    Ioss: string
} 

export interface ConsigneeAddress extends Address {
    Vat: string;
}


export interface Products{ 
    Description: string;
    Sku?: string;
    HsCode: string;
    OriginCountry: string;
    PurchaseUrl: string;
    Quantity: number;
    Value: number;
}