import { ErrorDetail, UnauthorizedError } from "@shipengine/connect-runtime";
import { HttpStatusCode } from "axios";
import { InternalReqRegister } from "./internal-models";
import { Address, ConsigneeAddress, CreateLabelReq, SenderAddress } from "../api/models/create-label-interface";
import { CarrierOperation, COMMANDS, WEIGHT_UNIT } from "./constants";
import { AddressBase, LabelFormatsEnum, Package, ShipFrom, ShipTo, TaxIdentifier, TaxIdentifierType } from "@shipengine/connect-carrier-api";


export const getAuthentication = (data: InternalReqRegister) => {
    return data?.api_key;
}

export const getCommand = (data: CarrierOperation) => {
    const command = data;
    switch (command) {
        case CarrierOperation.CreateLabel:
            return COMMANDS.OrderShipments;
            break;
        case CarrierOperation.GetShipment:
            return COMMANDS.GetShipment;
            break;
    }
}

export const getName = (address: AddressBase): string => {
    const firstName = address?.first_name;
    const lastName = address?.last_name;
    if (address?.name) {
        return address.name;
    }
    else {
        return firstName + " " + lastName;
    }
}

export const getSenderAddress = (shipFrom: ShipFrom): SenderAddress => {
    return {
        Name: getName(shipFrom),
        Company: shipFrom?.company_name,
        Address: getAddress(shipFrom),
        Email: shipFrom?.email,
        Phone: shipFrom?.phone_number,
        Vat:  getTaxIdentifierId(shipFrom?.tax_identifiers,TaxIdentifierType.VAT),      
        Eori: getTaxIdentifierId(shipFrom?.tax_identifiers,TaxIdentifierType.EORI),
        Ioss: getTaxIdentifierId(shipFrom?.tax_identifiers,TaxIdentifierType.IOSS),
    }
}

export const getConsigneeAddress = (shipTo: ShipTo): ConsigneeAddress => {
    return {
        Name: getName(shipTo),
        Company: shipTo?.company_name,
        Address: getAddress(shipTo),
        Email: shipTo?.email,
        Phone: shipTo?.phone_number,
        Vat: getTaxIdentifierId(shipTo?.tax_identifiers,TaxIdentifierType.EORI),
    }
}

const getTaxIdentifierId = (data,type: TaxIdentifierType):string => {
    const taxIdentifierValue = data.find(
        (typecheck) => typecheck.type.toLowerCase() === type)?.id;
    return taxIdentifierValue ?? "";
}

export const getAddress = (Address: AddressBase): Address => {
    return {
        AddressLine1: Address?.address_lines[0] ?? "",
        AddressLine2: Address?.address_lines[1] ?? "",
        AddressLine3: Address?.address_lines[2] ?? "",
        City: Address?.city_locality ?? "",
        State: Address?.state_province ?? "",
        Zip: Address?.postal_code,
        Country: Address?.country_code ?? "",

    }
}

export const getWeight = (pakg) => {
    if (pakg[0].weight_details.source_weight_unit === WEIGHT_UNIT.Pounds) {
        return pakg[0].weight_details.source_weight
    }
    else if (pakg[0].weight_details.source_weight_unit === WEIGHT_UNIT.Kilogram) {
        return pakg[0].weight_details.source_weight
    }
    else {
        return pakg[0].weight_details.weight_in_grams / 1000
    }
}

export const getWeightUnit = (pakg) => {
    if (pakg[0].weight_details.source_weight_unit = WEIGHT_UNIT.Pounds ){
        return "lb";
    }
    else if (pakg[0].weight_details.source_weight_unit = WEIGHT_UNIT.Kilogram ){
        return "kg";
    }
    else{
        return "kg"
    }
}


export const getLabelFormat = (label_format) => {
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

export const HandlesError = (error: any) => {
    const errorCode: ErrorDetail[] = [];
    if (error?.details) {
        errorCode.push(
            {
                errorCode: error.details[0].errorCode,
                message: error.details[0].message
            }
        )

    }

    if (error.statusCode === HttpStatusCode.Unauthorized) {
        throw new UnauthorizedError("Message From Carrier Api", errorCode);
    }
}
