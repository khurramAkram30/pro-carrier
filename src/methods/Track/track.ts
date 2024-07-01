import { TrackingRequest, TrackingResponse } from "@shipengine/connect-carrier-api";
import { BadRequestError, ExternalServerError } from "@shipengine/connect-runtime";
import { GetTrackingNumber } from "connect-carrier-api-utils";
import { mapRequest } from "./map-request";
import { ITrackResponse } from "../../api/models/track-interface";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";
import { HandleError } from "../../helpers/utils";
import { mapResponse } from "./map-response";

export const Track = async(request: TrackingRequest): Promise<TrackingResponse> => {
    const metadata = request?.metadata ?? {};
    const trackingNumber = GetTrackingNumber(request.identifiers ?? []);
    if(!trackingNumber){
        throw new BadRequestError("Please provide tracking_number.")
    }
    const mappedRequest = mapRequest(request);
    try {
        const trackResponse = await ProcessRequest<ITrackResponse>(mappedRequest,CarrierOperation.Track);
        HandleError(trackResponse);
        return mapResponse(trackResponse,metadata);
    } catch (error) {
        throw new ExternalServerError(error?.details?.[0]?.message);
    }
    
}