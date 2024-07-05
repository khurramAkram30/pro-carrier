import { PackageAttribute, RequiredToShipEnum } from '@shipengine/connect-carrier-api';
import { Package } from '../../../src/definitions/packaging';

describe('Check packaging type properties - Package', () => {
    test('Check Id', () => {
        //Act
        const result = Package.Id;

        //Assert
        expect(result).toBe('3d766cd8-44d9-49ba-8598-8f515eec9bb6');
    });

    test('Check Name', () => {
        //Act
        const result = Package.Name;

        //Assert
        expect(result).toBe('Package');
    });

    test('Check CarrierPackageTypeCode', () => {
        //Act
        const result = Package.CarrierPackageTypeCode;

        //Assert
        expect(result).toBe('package');
    });

    test('Check ApiCode', () => {
        //Act
        const result = Package.ApiCode;

        //Assert
        expect(result).toBe('procarrier_package');
    });

    test('Check Description', () => {
        //Act
        const result = Package.Description;

        //Assert
        expect(result).toBe('Package');
    });

    test('Check PackageAttributes', () => {
        //Arrange
        const expected = [PackageAttribute.Domestic,PackageAttribute.International];

        //Act
        const result = Package.PackageAttributes;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check RequiredToShip', () => {
        //Arrange
        const expected = [RequiredToShipEnum.Weight, RequiredToShipEnum.Dimensions];

        //Act
        const result = Package.RequiredToShip;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});
