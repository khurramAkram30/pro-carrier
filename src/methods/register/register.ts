import { RegisterRequest, RegisterResponse } from "@shipengine/connect-carrier-api";
import { CarrierOperation } from "../../helpers/constants";
import { validate } from "./validate";
import { mapRequest } from "./map-request";
import { BadRequestError } from "@shipengine/connect-runtime";
import { ProcessRequest } from "../../api/api-communicator";

export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const registration_info = request.registration_info;
    validate(registration_info);
    try {
        const thirdParty = mapRequest(registration_info);
        await ProcessRequest(thirdParty, CarrierOperation.Register); 
        
    } catch (error) {

    }

    return 

}
