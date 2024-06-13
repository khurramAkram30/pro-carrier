import { ShippingService, LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ServiceAttributesEnum, ConfirmationTypeEnum, SupportedLabelSize, LabelFormatsEnum } from "@shipengine/connect-carrier-api";

export const  ProCarrierParcelPacket: ShippingService = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb27",
    Name: "Pro Carrier Parcel Packet",
    ApiCode: "procarrier_pcpt",
    Code: "PCPT",
    Abbreviation: "pc_parcel_Pack",
    International: false,
    Class: ServiceClassEnum.Unspecified,
    Grade: ServiceGradeEnum.Unspecified,
    SupportedLabelSizes: [LabelSizesEnum.Inches4x6],
    SupportedCountries: [
        {
            FromCountry:'GB'
        },
        {
            FromCountry:'GG'
        },
        {
            FromCountry:'JE'
        },
        
    ],
    ServiceAttributes: [ ServiceAttributesEnum.Tracking ],
    ConfirmationTypes: [
        { Name: "No Confirmation Requird", Type: ConfirmationTypeEnum.None }
    ]
};