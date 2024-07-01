import { TrackingIdentifier, TrackingRequest } from "@shipengine/connect-carrier-api";
import { AxiosRequestConfig } from "axios";
import { COMMANDS, TEST_URL } from "../../helpers/constants";
import { ITrackRequest } from "../../api/models/track-interface";
import { getAuthentication } from "../../helpers/utils";
import { GetShipments } from "../../api/models/get-shipment-interface";
import { GetTrackingNumber } from "connect-carrier-api-utils";

export const mapRequest = (request: TrackingRequest):AxiosRequestConfig => {
    return{
        url: TEST_URL,
        method: "POST",
        data: GetTrack(request)  
    }
}
const GetTrack = (request: TrackingRequest): ITrackRequest => {
    return{
        Apikey: getAuthentication(request.metadata),
        Command: COMMANDS.TrackShipment,
        Shipment: getTackShipment(request.identifiers)
    }
}

const getTackShipment = (identifiers: TrackingIdentifier[]): GetShipments => {
    return { 
        TrackingNumber:GetTrackingNumber(identifiers),
    }
}