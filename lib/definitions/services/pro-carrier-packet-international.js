"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCarrierParcelPacketInternational = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.ProCarrierParcelPacketInternational = {
    Id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb31",
    Name: "Pro Carrier Parcel Packet International",
    ApiCode: "procarrier_pcpt_intl",
    Code: "PCPT",
    Abbreviation: "pc_parcel_Pack_intl",
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
//# sourceMappingURL=pro-carrier-packet-international.js.map