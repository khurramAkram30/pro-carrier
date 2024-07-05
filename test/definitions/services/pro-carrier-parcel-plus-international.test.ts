import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelPlusInternational } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb29');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Plus International');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpl_intl');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.Code;

        //Assert
        expect(result).toBe('PCPL');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_plus_intl');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.International;

        //Assert
        expect(result).toBe(true);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelPlusInternational.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelPlusInternational.SupportedLabelSizes;

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
        const result = ProCarrierParcelPlusInternational.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelPlusInternational.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelPlusInternational.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
