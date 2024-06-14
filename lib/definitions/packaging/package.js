"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const connect_carrier_api_1 = require("@shipengine/connect-carrier-api");
exports.Package = {
    Id: "3d766cd8-44d9-49ba-8598-8f515eec9bb6",
    Name: "Package",
    CarrierPackageTypeCode: "package",
    ApiCode: "procarrier_package",
    Description: "Package",
    PackageAttributes: [connect_carrier_api_1.PackageAttribute.Domestic, connect_carrier_api_1.PackageAttribute.International],
    RequiredToShip: [connect_carrier_api_1.RequiredToShipEnum.Weight, connect_carrier_api_1.RequiredToShipEnum.Dimensions]
};
//# sourceMappingURL=package.js.map