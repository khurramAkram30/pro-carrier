import { PackageType, PackageAttribute, RequiredToShipEnum } from '@shipengine/connect-carrier-api'

export const Package: PackageType = {
    Id: "3d766cd8-44d9-49ba-8598-8f515eec9bb6",
    Name: "Package",
    CarrierPackageTypeCode: "package",
    ApiCode: "procarrier_package",
    Description: "Package",
    PackageAttributes:[PackageAttribute.Domestic,PackageAttribute.International],
    RequiredToShip:[RequiredToShipEnum.Weight, RequiredToShipEnum.Dimensions]
}
