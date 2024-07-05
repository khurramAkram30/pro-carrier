import { ShippingService, LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ServiceAttributesEnum, ConfirmationTypeEnum, SupportedLabelSize, LabelFormatsEnum } from "@shipengine/connect-carrier-api";

export const  ProCarrierParcelPlus: ShippingService = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb26",
    Name: "Pro Carrier Parcel Plus",
    ApiCode: "procarrier_pcpl",
    Code: "PCPL",
    Abbreviation: "pc_parcel_plus",
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
        { Name: "No Confirmation Required", Type: ConfirmationTypeEnum.None }
    ]
};