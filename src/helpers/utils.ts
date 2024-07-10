import { ErrorDetail, ExternalServerError, UnauthorizedError } from "@shipengine/connect-runtime";
import { InternalReqRegister } from "./internal-models";
import { Address, ConsigneeAddress, SenderAddress } from "../api/models/create-label-request";
import { AddressBase, LabelFormatsEnum, Package, ShipFrom, ShipTo, TaxIdentifier, TaxIdentifierType, TrackingRequest, WeightUnit } from "@shipengine/connect-carrier-api";


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

export const getWeight = (pkg: Package) => {
    const weightDetaiils = pkg?.weight_details || null;
    if (weightDetaiils?.source_weight_unit === WeightUnit.Pounds || weightDetaiils?.source_weight_unit === WeightUnit.Kilograms) {
        return pkg.weight_details.source_weight
    }
    return pkg?.weight_details?.weight_in_grams / 1000
}

export const getWeightUnit = (pkg: Package) => {
    if (pkg?.weight_details?.source_weight_unit === WeightUnit.Pounds) {
        return "lb";
    }
    return "kg"
}

export const getLabelFormat = (label_format: string) => {
    return label_format === LabelFormatsEnum.ZPL? "ZPL200": label_format ?? LabelFormatsEnum.PDF
}

export const getIdentifierValue = (request: TrackingRequest, type: string): string => {
    return request.identifiers.find(p => p.type === type)?.value;
}

export const checkCarrierError = (error) => {
    if (error?.Error === "Access Denied") {
        throw new UnauthorizedError(`Error from Carrier Api: Error Code: ${error.ErrorLevel} , Error Message: ${error.Error}`);
    }
};

export const HandleError = (error) => {
    const ErrorDetail: ErrorDetail[] = [];
    if (error?.Error) {
        ErrorDetail.push(
            {
                errorCode: error?.ErrorLevel,
                message: "Error Received From API: " + "Error Code: " + error?.ErrorLevel + ", " + "Error Message: " + error?.Error
            }
        )

        throw new ExternalServerError(ErrorDetail[0].message);
    }
}

