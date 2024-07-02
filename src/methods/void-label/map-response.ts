import { VoidLabelsRequest, VoidLabelsResponse, VoidResponse } from "@shipengine/connect-carrier-api";
import { ICreateLabelResponse } from "../../api/models/create-label-response";

export const mapResponse = (voidRequestId: string, error: string): VoidResponse => {
    return{
        void_request_id:voidRequestId,
        message: error ? "Label not voided" : "Label voided successfully",
        errors: error ? [error] : undefined
    }
}
