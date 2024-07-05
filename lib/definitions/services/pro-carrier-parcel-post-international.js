"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCarrierParcelPostInternational = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.ProCarrierParcelPostInternational = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb30",
    Name: "Pro Carrier Parcel Post International",
    ApiCode: "procarrier_pcpp_intl",
    Code: "PCPP",
    Abbreviation: "pc_parcel_post_intl",
    International: true,
    Class: connect_carrier_api_1.ServiceClassEnum.Unspecified,
    Grade: connect_carrier_api_1.ServiceGradeEnum.Unspecified,
    SupportedLabelSizes: [connect_carrier_api_1.LabelSizesEnum.Inches4x6],
    SupportedCountries: [
        {
            FromCountry: 'GB'
        },
        {
            FromCountry: 'NL'
        }
    ],
    ServiceAttributes: [connect_carrier_api_1.ServiceAttributesEnum.Tracking],
    ConfirmationTypes: [
        { Name: "No Confirmation Required", Type: connect_carrier_api_1.ConfirmationTypeEnum.None }
    ]
};
//# sourceMappingURL=pro-carrier-parcel-post-international.js.map