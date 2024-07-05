import { TrackingRequest, TrackingResponse } from "@shipengine/connect-carrier-api";
import { BadRequestError, ExternalServerError } from "@shipengine/connect-runtime";
import { GetTrackingNumber } from "connect-carrier-api-utils";
import { mapRequest } from "./map-request";
import { ITrackResponse } from "../../api/models/track-interface";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";
import { HandleError, getIdentifierValue } from "../../helpers/utils";
import { mapResponse } from "./map-response";
import { validate } from "./validate";

export const Track = async (request: TrackingRequest): Promise<TrackingResponse> => {
    const metadata = request?.metadata ?? {};
    validate(request);
    const mappedRequest = mapRequest(request);
    const trackResponse = await ProcessRequest<ITrackResponse>(mappedRequest, CarrierOperation.Track);
    HandleError(trackResponse);
    
    return mapResponse(trackResponse, metadata);
}