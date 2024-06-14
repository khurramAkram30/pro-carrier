"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCarrierParcelPlusInternational = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.ProCarrierParcelPlusInternational = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb29",
    Name: "Pro Carrier Parcel Plus International",
    ApiCode: "procarrier_pcpl_intl",
    Code: "PCPL",
    Abbreviation: "pc_parcel_plus_intl",
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
        { Name: "No Confirmation Requird", Type: connect_carrier_api_1.ConfirmationTypeEnum.None }
    ]
};
//# sourceMappingURL=pro-carrier-parcel-plus-international.js.map