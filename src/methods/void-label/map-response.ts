import { VoidLabelsRequest, VoidLabelsResponse, VoidResponse } from "@shipengine/connect-carrier-api";
import { ICreateLabelResponse } from "../../api/models/create-label-response";

export const mapResponse = (request: VoidLabelsRequest, response:ICreateLabelResponse ): VoidLabelsResponse => {
    return{
        void_responses: [{
            void_request_id:request?.void_requests?.[0]?.void_request_id,
            message: getMessage(response),
            errors: []
        }],
        metadata:request?.metadata
    }
}

const getMessage = (response:ICreateLabelResponse):string => {
    if(response.ErrorLevel === 0){
        return "Label voided successfully";
    }
    else{
        return "Label cannot be voided";
    }
}