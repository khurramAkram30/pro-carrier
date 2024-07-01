import { VoidLabelsRequest, VoidLabelsResponse } from "@shipengine/connect-carrier-api";
import { BadRequestError, ExternalServerError } from "@shipengine/connect-runtime";
import { mapRequest } from "./map-request";
import { IVoidLabelResponse } from "../../api/models/void-label-interface";
import { CarrierOperation } from "../../helpers/constants";
import { ProcessRequest } from "../../api/api-communicator";
import { HandleError } from "../../helpers/utils";
import { mapResponse } from "./map-response";

export const VoidLabels = async (request: VoidLabelsRequest):Promise<VoidLabelsResponse> => {
    const trackingNumber = request?.void_requests?.[0]?.tracking_number ?? "";
    if(!trackingNumber){
        throw new BadRequestError("Please provide tracking_number.")
    }
    const mappedRequest = mapRequest(request);
    try {
        const voidResponse = await ProcessRequest<IVoidLabelResponse>(mappedRequest,CarrierOperation.VoidLabel);
        HandleError(voidResponse);
        return mapResponse(request,voidResponse);
    } catch (error) {
        throw new ExternalServerError(error?.details?.[0].message);
    }
    
}