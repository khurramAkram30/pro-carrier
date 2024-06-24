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
    SenderAddress?: Address;
    ConsigneeAddress?: Address;
    Weight?: number;
    WeightUnit?: string;
    Length?: number;
    Width?: number;
    Height?: number;
    DimUnit?: number;
    Value?: number;
    Currency?: string;
    CustomsDuty?: string;
    Description?: string;
    DeclarationType?: string;
    Products?: Products;
}   

interface Address {
    Name?: string;
    Company?: string;
    AddressLine1?: string;
    City?: string;
    State?: string;
    Zip?: string;
    Country?: string;
    Phone?: number;
    Email?: string;
    Vat?: number,
    Eori?: number;
    Ioss?: number
}

interface Products{ 
    Description?: string;
    Sku?: string;
    HsCode?: number;
    OriginCountry?: string;
    PurchaseUrl?: string;
    Quantity?: number;
    Value?: number;
}