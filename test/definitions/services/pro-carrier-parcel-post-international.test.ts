import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelPostInternational } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelPostInternational.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb30');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelPostInternational.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Post International');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelPostInternational.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpp_intl');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelPostInternational.Code;

        //Assert
        expect(result).toBe('PCPP');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelPostInternational.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_post_intl');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelPostInternational.International;

        //Assert
        expect(result).toBe(true);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelPostInternational.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelPostInternational.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelPostInternational.SupportedLabelSizes;

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
        const result = ProCarrierParcelPostInternational.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelPostInternational.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelPostInternational.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
