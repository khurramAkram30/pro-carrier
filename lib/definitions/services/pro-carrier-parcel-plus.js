"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCarrierParcelPlus = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.ProCarrierParcelPlus = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb26",
    Name: "Pro Carrier Parcel Plus",
    ApiCode: "procarrier_pcpl",
    Code: "PCPL",
    Abbreviation: "pc_parcel_plus",
    International: false,
    Class: connect_carrier_api_1.ServiceClassEnum.Unspecified,
    Grade: connect_carrier_api_1.ServiceGradeEnum.Unspecified,
    SupportedLabelSizes: [connect_carrier_api_1.LabelSizesEnum.Inches4x6],
    SupportedCountries: [
        {
            FromCountry: 'GB'
        },
        {
            FromCountry: 'GG'
        },
        {
            FromCountry: 'JE'
        },
    ],
    ServiceAttributes: [connect_carrier_api_1.ServiceAttributesEnum.Tracking],
    ConfirmationTypes: [
        { Name: "No Confirmation Requird", Type: connect_carrier_api_1.ConfirmationTypeEnum.None }
    ]
};
//# sourceMappingURL=pro-carrier-parcel-plus.js.map