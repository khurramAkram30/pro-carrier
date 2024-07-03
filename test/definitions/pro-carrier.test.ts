import * as services from '../../src/definitions/services';
import * as Packages from '../../src/definitions/packaging';
import { proCarrier } from '../../src/definitions/pro-carrier';
import { LabelFormatsEnum, LabelSizesEnum, ShippingOptionEnum } from '@shipengine/connect-carrier-api';
import { RegistrationFormSchema } from '../../src/definitions/forms/registration-form';
import { SettingsFormSchema } from '../../src/definitions/forms/setting-form';

describe("Check Carrier definitions properties", ()  =>{
    test('check id', () => {
        //Act
        const result = proCarrier.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb60');
    });

    test('check Name', () => {
        //Act
        const result = proCarrier.Name;

        //Assert
        expect(result).toBe('ProCarrier');
    });

    test('check Description', () => {
        //Act
        const result = proCarrier.Description;

        //Assert
        expect(result).toBe('A new carrier module (based on the API connection): ProCarrier');
    });

    test('check Apicode', () => {
        //Act
        const result = proCarrier.ApiCode;

        //Assert
        expect(result).toBe('procarrier');
    });
    
    test('check Carrier Url', () => {
        //Act
        const result = proCarrier.CarrierUrl;

        //Assert
        expect(result).toBe('https://weareprocarrier.com/');
    });

    test('check Tracking Url', () => {
        //Act
        const result = proCarrier.TrackingUrl;

        //Assert
        expect(result).toBe('https://tracking.weareprocarrier.com/?tn=[track_number]');
    });

    test('check Supported Countries', () => {
        //Arrange
        const expected = [
            {
                FromCountry:'GB'
            },
            {
                FromCountry:'GG'
            },
            {
                FromCountry:'JE'
            },
            {
                FromCountry:'NL'
            },
        ];

        //Act
        const result = proCarrier.DefaultSupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('check Label Format', () => {
        //Arrange
        const expected = [ LabelFormatsEnum.PDF, LabelFormatsEnum.PNG, LabelFormatsEnum.ZPL];

        //Act
        const result = proCarrier.LabelFormats;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check Supported Label Sizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = proCarrier.DefaultLabelSizes;

        //Assert
        expect(result).toStrictEqual(expected);


    });

    test('Check Shipping option', () => {
        //Arrange
        const expected = {
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
        };

        //Act
        const result = proCarrier.ShippingOptions;

        //Assert
        expect(result).toStrictEqual(expected);

    });

    test('check shipping services', () => {
        //Arrange
        const expected = [
            services.ProCarrierParcelExpress,
            services.ProCarrierParcelExpressInternational,
            services.ProCarrierParcelPacket,
            services.ProCarrierParcelPacketInternational,
            services.ProCarrierParcelPlus,
            services.ProCarrierParcelPlusInternational,
            services.ProCarrierParcelPost,
            services.ProCarrierParcelPostInternational,
        ];

        //Act
        const result = proCarrier.ShippingServices;
        
        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check PackageTypes', () => {
        //Arrange
        const expected = [Packages];

        //Act
        const result = proCarrier.PackageTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check AccountModals', () => {
        //Arrange
        const expected = {
            RegistrationFormSchema,
            SettingsFormSchema
        };

        //Act
        const result = proCarrier.AccountModals;

        //Assert
        expect(result).toStrictEqual(expected);
    });
    
}); 