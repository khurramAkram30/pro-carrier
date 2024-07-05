import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelPlus } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelPlus.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb26');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelPlus.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Plus');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelPlus.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpl');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelPlus.Code;

        //Assert
        expect(result).toBe('PCPL');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelPlus.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_plus');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelPlus.International;

        //Assert
        expect(result).toBe(false);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelPlus.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelPlus.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelPlus.SupportedLabelSizes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check SupportedCountries', () => {
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
        ];

        //Act
        const result = ProCarrierParcelPlus.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelPlus.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelPlus.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
