import { BadRequestError } from "@shipengine/connect-runtime";

export const validate = (registration_info) => {
    if(!registration_info.api_key){
        throw new BadRequestError('Api Key Required');
    }
    
}