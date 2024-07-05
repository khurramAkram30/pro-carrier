import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelPost } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelPost.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb27');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelPost.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Post');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelPost.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpp');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelPost.Code;

        //Assert
        expect(result).toBe('PCPP');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelPost.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_post');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelPost.International;

        //Assert
        expect(result).toBe(false);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelPost.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelPost.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelPost.SupportedLabelSizes;

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
        const result = ProCarrierParcelPost.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelPost.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelPost.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
