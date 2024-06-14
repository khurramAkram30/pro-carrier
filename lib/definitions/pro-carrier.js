"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proCarrier = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
const services = __importStar(require("./services"));
const Packages = __importStar(require("./packaging"));
const constants_1 = require("../helpers/constants");
const registration_form_1 = require("./forms/registration-form");
const setting_form_1 = require("./forms/setting-form");
exports.proCarrier = {
    Id: 'd0eab36d-3e0a-43a7-b304-54ec82e8cb60',
    Name: 'ProCarrier',
    Description: 'A new carrier module (based on the API connection): ProCarrier',
    ApiCode: 'procarrier',
    CarrierUrl: constants_1.CARRIER_URL,
    TrackingUrl: constants_1.TRACKING_URL,
    DefaultSupportedCountries: [
        {
            FromCountry: 'GB'
        },
        {
            FromCountry: 'NL'
        },
        {
            FromCountry: 'JE'
        },
        {
            FromCountry: 'GG'
        },
    ],
    LabelFormats: [
        connect_carrier_api_1.LabelFormatsEnum.PDF, connect_carrier_api_1.LabelFormatsEnum.PNG, connect_carrier_api_1.LabelFormatsEnum.ZPL
    ],
    DefaultLabelSizes: [connect_carrier_api_1.LabelSizesEnum.Inches4x6],
    ShippingOptions: {
        [connect_carrier_api_1.ShippingOptionEnum.ContainsAlcohol]: {
            Name: 'Contanins Alcohol',
            Description: 'Contanins Alcohol'
        },
        [connect_carrier_api_1.ShippingOptionEnum.B13ACanada]: {
            Name: 'B13ACanada',
            Description: 'B13ACanada'
        },
        [connect_carrier_api_1.ShippingOptionEnum.BillToThirdParty]: {
            Name: 'BillToThirdParty',
            Description: 'BillToThirdParty'
        },
        [connect_carrier_api_1.ShippingOptionEnum.CollectOnDelivery]: {
            Name: 'Collect On Delivery',
            Description: 'Collect On Delivery'
        },
        [connect_carrier_api_1.ShippingOptionEnum.ConsequentialLoss]: {
            Name: 'Consequential Loss',
            Description: 'Consequential Loss'
        },
        [connect_carrier_api_1.ShippingOptionEnum.DangerousGoods]: {
            Name: 'Dangerous Goods',
            Description: 'Dangerous Goods'
        },
        [connect_carrier_api_1.ShippingOptionEnum.DeliveryMessage]: {
            Name: 'Delivery Message',
            Description: 'Delivery Message'
        },
        [connect_carrier_api_1.ShippingOptionEnum.DontPrepayPostage]: {
            Name: 'Dont Prepay Postage',
            Description: 'Dont Prepay Postage'
        },
        [connect_carrier_api_1.ShippingOptionEnum.DryIce]: {
            Name: 'Dry Ice',
            Description: 'Dry Ice'
        },
        [connect_carrier_api_1.ShippingOptionEnum.EmailNotification]: {
            Name: 'Email Notification',
            Description: 'Email Notification'
        },
        [connect_carrier_api_1.ShippingOptionEnum.FreightClass]: {
            Name: 'Freight Class',
            Description: 'Freight Class'
        },
        [connect_carrier_api_1.ShippingOptionEnum.HoldForPickup]: {
            Name: 'Hold For Pickup',
            Description: 'Hold For Pickup'
        },
        [connect_carrier_api_1.ShippingOptionEnum.IncludeReturnLabel]: {
            Name: 'Include Return Label',
            Description: 'Include Return Label'
        },
        [connect_carrier_api_1.ShippingOptionEnum.LocalCollect]: {
            Name: 'Local Collect',
            Description: 'Local Collect'
        },
        [connect_carrier_api_1.ShippingOptionEnum.NonMachinable]: {
            Name: 'Non Machinable',
            Description: 'Non Machinable'
        },
        [connect_carrier_api_1.ShippingOptionEnum.NotificationType]: {
            Name: 'Notification Type',
            Description: 'Notification Type'
        },
        [connect_carrier_api_1.ShippingOptionEnum.ReleaseNoSignature]: {
            Name: 'Release No Signature',
            Description: 'Release No Signature'
        },
        [connect_carrier_api_1.ShippingOptionEnum.RequiresAdditionalHandling]: {
            Name: 'Requires Additional Handling',
            Description: 'Requires Additional Handling'
        },
        [connect_carrier_api_1.ShippingOptionEnum.Safeplace]: {
            Name: 'Safe place',
            Description: 'Safe place'
        },
        [connect_carrier_api_1.ShippingOptionEnum.SaturdayDelivery]: {
            Name: 'Saturday Delivery',
            Description: 'Saturday Delivery'
        },
        [connect_carrier_api_1.ShippingOptionEnum.SaturdayGuarantee]: {
            Name: 'Saturday Guarantee',
            Description: 'Saturday Guarantee'
        },
        [connect_carrier_api_1.ShippingOptionEnum.SmsNotification]: {
            Name: 'Sms Notification',
            Description: 'Sms Notification'
        },
        [connect_carrier_api_1.ShippingOptionEnum.SpecialHandling]: {
            Name: 'Special Handling',
            Description: 'Special Handling'
        },
        [connect_carrier_api_1.ShippingOptionEnum.ThirdPartyConsignee]: {
            Name: 'Third Party Consignee',
            Description: 'Third Party Consignee'
        },
        [connect_carrier_api_1.ShippingOptionEnum.CarrierInsurance]: {
            Name: 'Carrier Insurance',
            Description: 'Carrier Insurance'
        }
    },
    ShippingServices: [
        services.ProCarrierParcelExpress,
        services.ProCarrierParcelExpressInternational,
        services.ProCarrierParcelPacket,
        services.ProCarrierParcelPacketInternational,
        services.ProCarrierParcelPlus,
        services.ProCarrierParcelPlusInternational,
        services.ProCarrierParcelPost,
        services.ProCarrierParcelPostInternational,
    ],
    PackageTypes: [
        Packages.Package
    ],
    AccountModals: {
        RegistrationFormSchema: registration_form_1.RegistrationFormSchema,
        SettingsFormSchema: setting_form_1.SettingsFormSchema
    },
    Images: {
        Logo: '../../assets/logo.svg',
        Icon: '../../assets/icon.svg'
    }
};
//# sourceMappingURL=pro-carrier.js.map