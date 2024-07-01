import { VoidLabelsRequest, VoidRequest } from "@shipengine/connect-carrier-api";
import { IVoidlabelRequest } from "../../api/models/void-label-interface";
import { GetShipments } from "../../api/models/get-shipment-interface";
import { getAuthentication } from "../../helpers/utils";
import { COMMANDS, TEST_URL } from "../../helpers/constants";
import { AxiosRequestConfig } from "axios";

export const mapRequest = (request:VoidLabelsRequest): AxiosRequestConfig => {
    return {
        url:TEST_URL,
        method:"POST",
        data:getVoidLabel(request)
    };
}

const getVoidLabel = (request: VoidLabelsRequest) : IVoidlabelRequest => {
return{
        Apikey:getAuthentication(request.metadata),
        Command:COMMANDS.VoidShipment,
        Shipment:getVoidShipment(request?.void_requests),
    }
}


const getVoidShipment = (voidRequest: VoidRequest[]): GetShipments => {
    return {
        TrackingNumber:voidRequest?.[0]?.tracking_number ?? ""
    }
}