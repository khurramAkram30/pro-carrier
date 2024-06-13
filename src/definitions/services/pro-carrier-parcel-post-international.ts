import { ShippingService, LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ServiceAttributesEnum, ConfirmationTypeEnum, SupportedLabelSize, LabelFormatsEnum } from "@shipengine/connect-carrier-api";

export const  ProCarrierParcelPostInternational: ShippingService = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb30",
    Name: "Pro Carrier Parcel Post International",
    ApiCode: "procarrier_pcpp_intl",
    Code: "PCPP",
    Abbreviation: "pc_parcel_post_intl",
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