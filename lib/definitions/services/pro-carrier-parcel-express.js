"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCarrierParcelExpress = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.ProCarrierParcelExpress = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb25",
    Name: "Pro Carrier Parcel Express",
    ApiCode: "procarrier_pcpe",
    Code: "PCPE",
    Abbreviation: "pc_parcel_exp",
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
//# sourceMappingURL=pro-carrier-parcel-express.js.map