import { LabelFormatsEnum , LabelSizesEnum, Carrier, ShippingOptionEnum } from '@shipengine/connect-carrier-api';
import * as services from './services';
import * as Packages from './packaging';
import { CARRIER_URL , TRACKING_URL } from '../helpers/constants';
import { RegistrationFormSchema } from './forms/registration-form';
import { SettingsFormSchema } from './forms/setting-form';

export const proCarrier : Carrier = { 
    Id: 'd0eab36d-3e0a-43a7-b304-54ec82e8cb60',
    Name: 'ProCarrier',
    Description: 'A new carrier module (based on the API connection): ProCarrier',
    ApiCode: 'procarrier',
    CarrierUrl: CARRIER_URL,
    TrackingUrl: TRACKING_URL,
    DefaultSupportedCountries: [
        {
            FromCountry : 'GB'
        },
        {
            FromCountry : 'NL'
        },
        {
            FromCountry : 'JE'
        },
        {
            FromCountry : 'GG'
        },
    ],
    LabelFormats: [
        LabelFormatsEnum.PDF, LabelFormatsEnum.PNG, LabelFormatsEnum.ZPL
    ],
    DefaultLabelSizes: [ LabelSizesEnum.Inches4x6 ],
    ShippingOptions : {
    [ShippingOptionEnum.ContainsAlcohol]: 
    {
        Name: 'Contanins Alcohol',
        Description: 'Contanins Alcohol'
    },
    [ShippingOptionEnum.B13ACanada]: 
    {
        Name: 'B13ACanada',
        Description: 'B13ACanada'
    },
    [ShippingOptionEnum.BillToThirdParty]: 
    {
        Name: 'BillToThirdParty',
        Description: 'BillToThirdParty'
    },
    [ShippingOptionEnum.CollectOnDelivery]: 
    {
        Name: 'Collect On Delivery',
        Description: 'Collect On Delivery'
    },
    [ShippingOptionEnum.ConsequentialLoss]: 
    {
        Name: 'Consequential Loss',
        Description: 'Consequential Loss'
    },
    [ShippingOptionEnum.DangerousGoods]: 
    {
        Name: 'Dangerous Goods',
        Description: 'Dangerous Goods'
    },
    [ShippingOptionEnum.DeliveryMessage]: 
    {
        Name: 'Delivery Message',
        Description: 'Delivery Message'
    },
    [ShippingOptionEnum.DontPrepayPostage]: 
    {
        Name: 'Dont Prepay Postage',
        Description: 'Dont Prepay Postage'
    },
    [ShippingOptionEnum.DryIce]: 
    {
        Name: 'Dry Ice',
        Description: 'Dry Ice'
    },
    [ShippingOptionEnum.EmailNotification]: 
    {
        Name: 'Email Notification',
        Description: 'Email Notification'
    },
    [ShippingOptionEnum.FreightClass]: 
    {
        Name: 'Freight Class',
        Description: 'Freight Class'
    },
    [ShippingOptionEnum.HoldForPickup]: 
    {
        Name: 'Hold For Pickup',
        Description: 'Hold For Pickup'
    },
    [ShippingOptionEnum.IncludeReturnLabel]: 
    {
        Name: 'Include Return Label',
        Description: 'Include Return Label'
    },
    [ShippingOptionEnum.LocalCollect]: 
    {
        Name: 'Local Collect',
        Description: 'Local Collect'
    },
    [ShippingOptionEnum.NonMachinable]: 
    {
        Name: 'Non Machinable',
        Description: 'Non Machinable'
    },
    [ShippingOptionEnum.NotificationType]: 
    {
        Name: 'Notification Type',
        Description: 'Notification Type'
    },
    [ShippingOptionEnum.ReleaseNoSignature]: 
    {
        Name: 'Release No Signature',
        Description: 'Release No Signature'
    },
    [ShippingOptionEnum.RequiresAdditionalHandling]: 
    {
        Name: 'Requires Additional Handling',
        Description: 'Requires Additional Handling'
    },
    [ShippingOptionEnum.Safeplace]: 
    {
        Name: 'Safe place',
        Description: 'Safe place'
    },
    [ShippingOptionEnum.SaturdayDelivery]: 
    {
        Name: 'Saturday Delivery',
        Description: 'Saturday Delivery'
    }, 
    [ShippingOptionEnum.SaturdayGuarantee]: 
    {
        Name: 'Saturday Guarantee',
        Description: 'Saturday Guarantee'
    }, 
    [ShippingOptionEnum.SmsNotification]: 
    {
        Name: 'Sms Notification',
        Description: 'Sms Notification'
    }, 
    [ShippingOptionEnum.SpecialHandling]: 
    {
        Name: 'Special Handling',
        Description: 'Special Handling'
    }, 
    [ShippingOptionEnum.ThirdPartyConsignee]: 
    {
        Name: 'Third Party Consignee',
         Description: 'Third Party Consignee'
    }, 
    [ShippingOptionEnum.CarrierInsurance]: 
    {
        Name: 'Carrier Insurance',
        Description: 'Carrier Insurance'
    }
    },
    ShippingServices:[
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
        RegistrationFormSchema,
        SettingsFormSchema   
    },
    Images:{
        Logo: '../../assets/logo.svg',
        Icon: '../../assets/icon.svg'
    }

};