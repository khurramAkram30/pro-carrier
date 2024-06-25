export interface CreateLabelReq {
    ApiKey?: string;
    Command?: string;
    Shipments?:Shipments
}
export interface Shipments {
    RequireCarrierTrackingNumber?: boolean,
    LabelOption?: string;
    LabelFormat?: string;
    ShipperReference?: string;
    DisplayID?: string;
    Service?: string;
    SenderAddress?: SenderAddress;
    ConsigneeAddress?: ConsigneeAddress;
    Weight?: number;
    WeightUnit?: string;
    Length?: number;
    Width?: number;
    Height?: number;
    DimUnit?: string;
    Value?: number;
    Currency?: string;
    CustomsDuty?: string;
    Description?: string;
    DeclarationType?: string;
    Products?: Products[];
}   

export interface SenderAddress {
    Name?: string;
    Company?: string;
    Address?: Address;
    Phone?: string;
    Email?: string;
    Vat?: string,
    Eori?: string;
    Ioss?: string
}

export interface ConsigneeAddress {
    Name?: string;
    Company?: string;
    Address?: Address;
    Phone?: string;
    Email?: string;
    Vat?: string,
    PudoLocationId?: string
}

export interface Address {
    AddressLine1?: string;
    AddressLine2?: string;
    AddressLine3?: string;
    City?: string;
    State?: string;
    Zip?: string;
    Country?: string;
}

export interface Products{ 
    Description?: string;
    Sku?: string;
    HsCode?: number;
    OriginCountry?: string;
    PurchaseUrl?: string;
    Quantity?: number;
    Value?: number;
}