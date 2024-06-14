import { BadRequestError } from "@shipengine/connect-runtime";

export const validate = (registrationRequest) => {
    if(!registrationRequest.api_key){
        throw new BadRequestError('Api Key Required');
    }
    
}