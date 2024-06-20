import { RegisterRequest, RegisterResponse } from "@shipengine/connect-carrier-api";
import { CarrierOperation } from "../../helpers/constants";
import { validate } from "./validate";
import { mapRequest } from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { mapResponse } from "./map-response";
import { InternalReqRegister } from "../../helpers/internal-models";
import { HttpStatusCode, UnauthorizedError } from "@shipengine/connect-runtime";


export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const registration_info = <InternalReqRegister>request.registration_info;
    validate(registration_info);
    try {
        const thirdParty = mapRequest(registration_info);
        await ProcessRequest(thirdParty, CarrierOperation.Register);

    } catch (error) {
        if (error.statusCode === HttpStatusCode.UnAuthorized) {
            throw new UnauthorizedError(error.details[0].message);
        }   
    }

    return mapResponse(registration_info);
}
