import { RegisterRequest, RegisterResponse } from "@shipengine/connect-carrier-api";
import { CarrierOperation } from "../../helpers/constants";
import { validate } from "./validate";
import { mapRequest } from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { mapResponse } from "./map-response";
import { InternalReqRegister } from "../../helpers/internal-models";
import { getCarrierError } from "../../helpers/utils";


export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const registrationInfo = <InternalReqRegister>request.registration_info || {};
    validate(registrationInfo);
    const mapedRequest = mapRequest(registrationInfo);
    const response = await ProcessRequest(mapedRequest, CarrierOperation.Register);
    getCarrierError(response);

    return mapResponse(registrationInfo);
}
