import { TrackingRequest } from "@shipengine/connect-carrier-api";
import { getIdentifierValue } from "../../helpers/utils";
import { BadRequestError } from "@shipengine/connect-runtime";

export const validate = (request:TrackingRequest) =>{
    if(!getIdentifierValue(request,'tracking_number')){
        throw new BadRequestError("Please provide tracking_number");
    }
}