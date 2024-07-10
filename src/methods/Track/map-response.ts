import { StandardizedStatusCodes, TrackingResponse } from "@shipengine/connect-carrier-api";
import { ITrackResponse } from "../../api/models/track-interface";
import { CARRIER_NAME } from "../../helpers/constants";
import { InternalReqRegister } from "../../helpers/internal-models";

export const mapResponse = (response: ITrackResponse,metadata:InternalReqRegister): TrackingResponse => {
    const eventSortDesc = response.Shipment.Events.sort(
        (a,b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime());
    const latestEvent = eventSortDesc[0];
    return {
        tracking_info: {
            carrier_name: CARRIER_NAME,
            tracking_number: response.Shipment.TrackingNumber,
            standardized_status_code: getStandarizedCode(latestEvent?.Code),
            carrier_status_code: latestEvent.Code,
            carrier_status_description: latestEvent?.Description,
            estimated_delivery_datetime: "",
            actual_delivery_datetime: latestEvent?.DateTime,
            weight: response.Shipment.Weight,
            service: {
                code: response.Shipment.Service
            },
            events: 
            eventSortDesc?.map((evt) => ({
                event_datetime: evt.DateTime,
                event_code: evt.Code,
                event_datetime_local: evt.DateTime,
                description: evt.Description,
                country: evt?.Country ?? undefined,
                status_code:getStandarizedCode(evt.Code)
            })
            ),
            
        },
        metadata:metadata
    }
}

const getStandarizedCode = (trackingCode:string): StandardizedStatusCodes => {
    switch (trackingCode) {
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
        default:
            return StandardizedStatusCodes.Unknown;
    }
}