import { StandardizedStatusCodes, TrackingResponse } from "@shipengine/connect-carrier-api";
import { ITrackEvents, ITrackResponse } from "../../api/models/track-interface";
import { CARRIER_NAME } from "../../helpers/constants";
import { InternalReqRegister } from "../../helpers/internal-models";

export const mapResponse = (response: ITrackResponse,metadata:InternalReqRegister): TrackingResponse => {
    const eventTracking = response.Shipment.Events
    return {
        tracking_info: {
            carrier_name: CARRIER_NAME,
            tracking_number: response.Shipment.TrackingNumber,
            standardized_status_code: getStandarizedCode(eventTracking),
            carrier_status_code: response?.Shipment?.Events?.[0]?.Code,
            carrier_status_description: response?.Shipment?.Events?.[0]?.Description,
            estimated_delivery_datetime: "",
            actual_delivery_datetime: response?.Shipment?.Events?.[0]?.DateTime,
            weight: response.Shipment.Weight,
            service: {
                code: response.Shipment.Service
            },
            events: [
                {
                    event_datetime: response.Shipment.Events[0].DateTime,
                    event_code: response.Shipment.Events[0].Code,
                    event_datetime_local: response.Shipment.Events[0].DateTime,
                    description: response.Shipment.Events[0].Description,
                    country: response?.Shipment?.Events?.[0]?.Country ?? undefined,
                    status_code:getStandarizedCode(eventTracking)
                }
            ],
            
        },
        metadata:metadata
    }
}

const getStandarizedCode = (trackingEvents: ITrackEvents[]): StandardizedStatusCodes => {
    const trackCode = trackingEvents?.[0].Code ?? [];
    switch (trackCode) {
        case 'AAY':
        case 'AAM':
        case 'ACZ':
        case 'ADD':
        case 'ADA':
        case 'AAN':
        case 'AAO':
        case 'ABC':
        case 'ACO':
        case 'ABS':
        case 'ACM':
        case 'AET':
        case 'AEU':
        case 'AEZ':
            return StandardizedStatusCodes.InTransit;
        case 'ADM':
        case 'AND':
        case 'ADO':
        case 'ADR':
        case 'ABY':
        case 'ACH':
        case 'AEJ':
        case 'AEK':
        case 'AEM':
        case 'ACR':
        case 'AEH':
        case 'ABQ':
        case 'ACS':
        case 'ADV':
        case 'ADW':
        case 'ADX':
        case 'ADY':
        case 'AFA':
        case 'ACV':
        case 'AEA':
        case 'AAE':
        case 'AAG':
        case 'AAH':
        case 'AAI':
        case 'AAJ':
            return StandardizedStatusCodes.Exception;
        case 'AES':
        case 'AEY':
        case 'AEV':
            return StandardizedStatusCodes.Delivered;
        case 'ABZ':
            return StandardizedStatusCodes.DeliveredToServicePoint
    }
}