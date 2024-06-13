import { ShippingService, LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ServiceAttributesEnum, ConfirmationTypeEnum, SupportedLabelSize, LabelFormatsEnum } from "@shipengine/connect-carrier-api";

export const  ProCarrierParcelExpressInternational: ShippingService = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb28",
    Name: "Pro Carrier Parcel Express International",
    ApiCode: "procarrier_pcpe_intl",
    Code: "PCPE",
    Abbreviation: "pc_parcel_exp_intl",
    International: true,
    Class: ServiceClassEnum.Unspecified,
    Grade: ServiceGradeEnum.Unspecified,
    SupportedLabelSizes: [LabelSizesEnum.Inches4x6],
    SupportedCountries: [
        {
            FromCountry:'GB'
        },
        {
            FromCountry:'NL'
        }
    ],
    ServiceAttributes: [ ServiceAttributesEnum.Tracking ],
    ConfirmationTypes: [
        { Name: "No Confirmation Requird", Type: ConfirmationTypeEnum.None }
    ]
};