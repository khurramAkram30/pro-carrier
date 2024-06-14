import { RegisterResponse } from "@shipengine/connect-carrier-api";
import { InternalReqRegister } from "../../helpers/internal-models";

export const  mapResponse = (registration_info : InternalReqRegister):RegisterResponse => {
    return {
        credentials:{
            username: registration_info.api_key,
            password: "******"
        },
        metadata:{
            api_key: registration_info.api_key
        }
    }


}