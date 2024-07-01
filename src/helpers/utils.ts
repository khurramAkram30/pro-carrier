import { ErrorDetail, ExternalServerError, UnauthorizedError } from "@shipengine/connect-runtime";
import { HttpStatusCode } from "axios";
import { InternalReqRegister } from "./internal-models";
import { Address, ConsigneeAddress, SenderAddress } from "../api/models/create-label-request";
import { CarrierOperation, COMMANDS } from "./constants";
import { AddressBase, CreateLabelRequest, LabelFormatsEnum, Package, ShipFrom, ShipTo, TaxIdentifier, TaxIdentifierType, WeightUnit, requests } from "@shipengine/connect-carrier-api";


export const getAuthentication = (data: InternalReqRegister) => {
    const metaData = data ?? {};
    return metaData?.api_key ?? "";
}
export const getSenderAddress = (shipFrom: ShipFrom): SenderAddress => {
    return {
        ...getAddress(shipFrom),
        Vat: getTaxIdentifierId(shipFrom?.tax_identifiers, TaxIdentifierType.VAT),
        Eori: getTaxIdentifierId(shipFrom?.tax_identifiers, TaxIdentifierType.EORI),
        Ioss: getTaxIdentifierId(shipFrom?.tax_identifiers, TaxIdentifierType.IOSS),
    }
}

export const getConsigneeAddress = (shipTo: ShipTo): ConsigneeAddress => {
    return {
        ...getAddress(shipTo),
        Vat: getTaxIdentifierId(shipTo?.tax_identifiers, TaxIdentifierType.VAT),
    }
}

const getTaxIdentifierId = (data: TaxIdentifier[], type: TaxIdentifierType): string => {
    const ti = data || [];
    return ti.find(TaxIdentifier => TaxIdentifier.type.toLowerCase() === type)?.id ?? '';
}

export const getAddress = (address: AddressBase): Address => {
    const addressLines = address.address_lines ?? [];
    const mappedAddress: Address = {
        Name: getName(address),
        Company: address?.company_name,
        AddressLine1: addressLines[0],
        AddressLine2: addressLines[1],
        AddressLine3: addressLines[2],
        City: address?.city_locality,
        State: address?.state_province,
        Zip: address?.postal_code,
        Country: address?.country_code,
        Email: address?.email,
        Phone: address?.phone_number,
    }
    return mappedAddress;
}

export const getName = (address: AddressBase): string => {

    if (address?.name) {
        return address.name;
    }
    else {
        const firstName = address?.first_name || "";
        const lastName = address?.last_name || "";
        return firstName + " " + lastName;
    }
}

export const getWeight = (pakg: Package) => {
    const weightDetaiils =  pakg?.weight_details || null;

    if (weightDetaiils?.source_weight_unit === WeightUnit.Pounds) {
        return pakg.weight_details.source_weight
    }
    else if (weightDetaiils?.source_weight_unit === WeightUnit.Kilograms) {
        return pakg.weight_details.source_weight
    }
    else {
        return pakg?.weight_details?.weight_in_grams / 1000
    }
}

export const getWeightUnit = (pakg: Package) => {
    if (pakg?.weight_details?.source_weight_unit === WeightUnit.Pounds) {
        return "lb";
    }
    else if (pakg?.weight_details?.source_weight_unit === WeightUnit.Kilograms) {
        return "kg";
    }
    else {
        return "kg"
    }
}


export const getLabelFormat = (label_format: string) => {
    if (label_format === LabelFormatsEnum.PDF) {
        return LabelFormatsEnum.PDF;
    }
    if (label_format === LabelFormatsEnum.PNG) {
        return LabelFormatsEnum.PNG;
    }
    if (label_format === LabelFormatsEnum.ZPL) {
        return "ZPL200";
    }
    else {
        return LabelFormatsEnum.PDF;
    }
}

export const getCustomError = (err: any) => {
    const customError = err.Error;
    if (customError === "Access Denied") {
        throw new UnauthorizedError('Error from Carrier Api', [
            {
                errorCode: err.ErrorLevel,
                message: "Access denied"
            }
        ]);
    }
};

export const HandleError = (error) => {
    const errorCode: ErrorDetail[] = [];
    const baseError = "Error Received From API: ";
    if (error?.Error) {
        errorCode.push(
            {
                errorCode: error?.ErrorLevel,
                message: baseError + "Error Code: " + error?.ErrorLevel + ", " + "Error Message: " + error?.Error
            }
        )

        throw new ExternalServerError(baseError, errorCode);
    }
}
