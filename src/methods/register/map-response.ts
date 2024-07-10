import { RegisterResponse } from "@shipengine/connect-carrier-api";
import { InternalReqRegister } from "../../helpers/internal-models";
import { v6 as uuidv6 } from 'uuid';

export const  mapResponse = (registration_info : InternalReqRegister):RegisterResponse => {
    return {
        credentials:{
            username: uuidv6(),
            password: "******"
        },
        metadata:{
            api_key: registration_info.api_key
        }
    }
}