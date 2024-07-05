import { LabelSizesEnum, ServiceGradeEnum, ServiceClassEnum, ConfirmationTypeEnum, ServiceAttributesEnum } from '@shipengine/connect-carrier-api';
import { ProCarrierParcelPacketInternational } from '../../../src/definitions/services';

describe('Check service definitions properties - Demo Service', () => {
    test('Check Id', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.Id;

        //Assert
        expect(result).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb31');
    });

    test('Check Name', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.Name;

        //Assert
        expect(result).toBe('Pro Carrier Parcel Packet International');
    });

    test('Check ApiCode', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.ApiCode;

        //Assert
        expect(result).toBe('procarrier_pcpt_intl');
    });

    test('Check Code', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.Code;

        //Assert
        expect(result).toBe('PCPT');
    });
    
    test('Check Abbreviation', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.Abbreviation;

        //Assert
        expect(result).toBe('pc_parcel_Pack_intl');
    });

    test('Check International flag', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.International;

        //Assert
        expect(result).toBe(true);
    });

    test('Check Class', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.Class;

        //Assert
        expect(result).toBe(ServiceClassEnum.Unspecified);
    });

    test('Check Grade', () => {
        //Act
        const result = ProCarrierParcelPacketInternational.Grade;

        //Assert
        expect(result).toBe(ServiceGradeEnum.Unspecified);
    });

    test('Check SupportedLabelSizes', () => {
        //Arrange
        const expected = [LabelSizesEnum.Inches4x6];

        //Act
        const result = ProCarrierParcelPacketInternational.SupportedLabelSizes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check SupportedCountries', () => {
        //Arrange
        const expected = [
            { FromCountry: 'GB' }, 
            { FromCountry:'NL' }
        ];

        //Act
        const result = ProCarrierParcelPacketInternational.SupportedCountries;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ServiceAttributes', () => {
        //Arrange
        const expected = [
            ServiceAttributesEnum.Tracking,
        ];

        //Act
        const result = ProCarrierParcelPacketInternational.ServiceAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check ConfirmationTypes', () => {
        //Arrange
        const expected = [
            { Name: "No Confirmation Required", Type: ConfirmationTypeEnum.None }
        ];

        //Act
        const result = ProCarrierParcelPacketInternational.ConfirmationTypes;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
