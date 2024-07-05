import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelExpress } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelExpress.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb25');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelExpress.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Express');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelExpress.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpe');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelExpress.Code;

        //Assert
        expect(result).toBe('PCPE');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelExpress.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_exp');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelExpress.International;

        //Assert
        expect(result).toBe(false);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelExpress.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelExpress.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelExpress.SupportedLabelSizes;

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
                FromCountry: 'GG'
            },
            {
                FromCountry: 'JE'
            },
        ];

        //Act
        const result = ProCarrierParcelExpress.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelExpress.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelExpress.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
