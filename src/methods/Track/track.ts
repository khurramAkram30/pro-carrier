import { TrackingRequest, TrackingResponse } from "@shipengine/connect-carrier-api";
import { mapRequest } from "./map-request";
import { ITrackResponse } from "../../api/models/track-interface";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";
import { HandleError } from "../../helpers/utils";
import { mapResponse } from "./map-response";
import { validate } from "./validate";
import { GetTrackingNumber } from "connect-carrier-api-utils";
import { BadRequestError } from "@shipengine/connect-runtime";

export const Track = async (request: TrackingRequest): Promise<TrackingResponse> => {
    const metadata = request?.metadata ?? {};
    const trackingNumber = GetTrackingNumber(request.identifiers);
    if (!trackingNumber) {
        throw new BadRequestError('Please provide Tracking Number.');
    }
    const mappedRequest = mapRequest(request);
    const trackResponse = await ProcessRequest<ITrackResponse>(mappedRequest, CarrierOperation.Track);
    HandleError(trackResponse);
    
    return mapResponse(trackResponse, metadata);
}