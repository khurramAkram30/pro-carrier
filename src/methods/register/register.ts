import { RegisterRequest, RegisterResponse } from "@shipengine/connect-carrier-api";
import { CarrierOperation } from "../../helpers/constants";
import { validate } from "./validate";
import { mapRequest } from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { mapResponse } from "./map-response";
import { InternalReqRegister } from "../../helpers/internal-models";
import { HttpStatusCode, UnauthorizedError } from "@shipengine/connect-runtime";
import { getCustomError } from "../../helpers/utils";


export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const registrationInfo = <InternalReqRegister>request.registration_info || {};
    validate(registrationInfo);
    const mapedRequest = mapRequest(registrationInfo);
    try {
        const response = await ProcessRequest(mapedRequest, CarrierOperation.Register);
        getCustomError(response);

    } catch (error) {
        if (error.statusCode === HttpStatusCode.UnAuthorized) {
            throw new UnauthorizedError(error.details[0].message);
        }   
    }
    
    return mapResponse(registrationInfo);
}
