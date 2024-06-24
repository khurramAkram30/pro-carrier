import { ErrorDetail, UnauthorizedError } from "@shipengine/connect-runtime";
import { HttpStatusCode } from "axios";
import { InternalReqRegister } from "./internal-models";
import { CreateLabelReq } from "../api/models/create-label-interface";
import { CarrierOperation, Commands } from "./constants";
import { LabelFormatsEnum } from "@shipengine/connect-carrier-api";


export const getAuthentication = (data: InternalReqRegister) => {
    return data?.api_key;
}

export const getCommand = (data: CarrierOperation) => {
    const command = data;
    switch (command) {
        case CarrierOperation.CreateLabel:
            return Commands.OrderShipments;
            break;
        case CarrierOperation.GetShipment:
            return Commands.GetShipment;
            break;
        }
}

export const getServiceCode = (code) => {
    return "";
}

export const getLabelFormat = (label_format) => {
    
    if (label_format === LabelFormatsEnum.PDF){
        return LabelFormatsEnum.PDF;
    }
    if (label_format === LabelFormatsEnum.PNG){
        return LabelFormatsEnum.PNG;
    }
    if (label_format === LabelFormatsEnum.ZPL){
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
