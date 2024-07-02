import { VoidLabelsRequest, VoidRequest } from "@shipengine/connect-carrier-api";
import { IVoidlabelRequest } from "../../api/models/void-label-interface";
import { GetShipments } from "../../api/models/get-shipment-interface";
import { getAuthentication } from "../../helpers/utils";
import { COMMANDS, TEST_URL } from "../../helpers/constants";
import { AxiosRequestConfig } from "axios";
import { InternalReqRegister } from "../../helpers/internal-models";

export const mapRequest = (trackingNumber: string, metadata: InternalReqRegister): AxiosRequestConfig => {
    return {
        url: TEST_URL,
        method: "POST",
        data: {
            Apikey: getAuthentication(metadata),
            Command: COMMANDS.VoidShipment,
            Shipment: getVoidShipment(trackingNumber),
        }
    };
}

const getVoidShipment = (trackingNumber: string): GetShipments => {
    return {
        TrackingNumber: trackingNumber
    }
}