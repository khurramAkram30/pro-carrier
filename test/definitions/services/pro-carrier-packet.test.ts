import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelPacket } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelPacket.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb27');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelPacket.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Packet');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelPacket.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpt');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelPacket.Code;

        //Assert
        expect(result).toBe('PCPT');
    });

    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelPacket.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_Pack');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelPacket.International;

        //Assert
        expect(result).toBe(false);
    });

    test('Check Class', () => {
        //Act 
        const result = ProCarrierParcelPacket.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelPacket.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelPacket.SupportedLabelSizes;

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
        const result = ProCarrierParcelPacket.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelPacket.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: 'No Confirmation Required', Type: ConfirmationTypeEnum.None },
        ];

        //Act
        const result = ProCarrierParcelPacket.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
