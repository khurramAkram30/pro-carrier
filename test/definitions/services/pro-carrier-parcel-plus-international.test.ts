import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelExpressInternational } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb29');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Plus International');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpl_intl');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.Code;

        //Assert
        expect(result).toBe('PCPL');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_plus_intl');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.International;

        //Assert
        expect(result).toBe(true);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelExpressInternational.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelExpressInternational.SupportedLabelSizes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check SupportedCountries', () => {
        //Arrange
        const expected = [
            {
                FromCountry: 'GB'
            },
            {
                FromCountry: 'NL'
            }
        ];

        //Act
        const result = ProCarrierParcelExpressInternational.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelExpressInternational.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelExpressInternational.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
