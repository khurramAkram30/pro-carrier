"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCarrierParcelPost = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.ProCarrierParcelPost = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb27",
    Name: "Pro Carrier Parcel Post",
    ApiCode: "procarrier_pcpp",
    Code: "PCPP",
    Abbreviation: "pc_parcel_post",
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
//# sourceMappingURL=pro-carrier-parcel-post.js.map