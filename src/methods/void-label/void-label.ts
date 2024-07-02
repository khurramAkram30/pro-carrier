import { VoidLabelsRequest, VoidLabelsResponse, VoidResponse } from "@shipengine/connect-carrier-api";
import { BadRequestError, ExternalServerError } from "@shipengine/connect-runtime";
import { mapRequest } from "./map-request";
import { IVoidLabelResponse } from "../../api/models/void-label-interface";
import { CarrierOperation } from "../../helpers/constants";
import { ProcessRequest } from "../../api/api-communicator";
import { mapResponse } from "./map-response";
import { InternalReqRegister } from "../../helpers/internal-models";

export const VoidLabels = async (request: VoidLabelsRequest): Promise<VoidLabelsResponse> => {
    const metadata = <InternalReqRegister>request.metadata;
    const voidResponse: VoidResponse[] = [];

    for (let i = 0; i < request.void_requests.length; i++) {
        let error:string;
        const voidReq = request.void_requests[i];
        const trackingNumber = voidReq?.tracking_number ?? "";
        const mappedRequest = mapRequest(trackingNumber, metadata);
        const voidLabelResponse = await ProcessRequest<IVoidLabelResponse>(mappedRequest, CarrierOperation.VoidLabel);
        if(voidLabelResponse.ErrorLevel !== 0 )
        {
            error = voidLabelResponse.Error;
        }
        voidResponse.push(mapResponse(voidReq.void_request_id,error));
    }
    return{
        void_responses:voidResponse,
        metadata:metadata
    }

}