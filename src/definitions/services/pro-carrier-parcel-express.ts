import { ShippingService, LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ServiceAttributesEnum, ConfirmationTypeEnum, SupportedLabelSize, LabelFormatsEnum } from "@shipengine/connect-carrier-api";

export const  ProCarrierParcelExpress: ShippingService = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb25",
    Name: "Pro Carrier Parcel Express",
    ApiCode: "procarrier_pcpe",
    Code: "PCPE",
    Abbreviation: "pc_parcel_exp",
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