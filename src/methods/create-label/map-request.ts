import { Axios, AxiosRequestConfig } from "axios"
import { CarrierOperation, TEST_URL } from "../../helpers/constants";
import { CreateLabelReq, Shipments} from "../../api/models/create-label-interface";
import { getAuthentication, getCommand, getLabelFormat, getServiceCode } from "../../helpers/utils";
import { CreateLabelRequest } from "@shipengine/connect-carrier-api";

export const mapRequest = (request: CreateLabelRequest): AxiosRequestConfig => { 
    console.log(request);
    return {
        url:TEST_URL,
        method:"POST",
        data:orderShipment(request)
    };
}

const orderShipment = (data: CreateLabelRequest): CreateLabelReq => ({
        ApiKey: getAuthentication(data.metadata),
        Command: getCommand(CarrierOperation.CreateLabel),
        Shipments: getShipment(data)
});

const getShipment = (data : CreateLabelRequest) : Shipments  => {
    return {
        RequireCarrierTrackingNumber: true,
        LabelOption: "System",
        LabelFormat: getLabelFormat(data.label_format),
        ShipperReference: data?.packages[0]?.label_messages?.reference1,
        Service:getServiceCode(data.service_code),
        

    };
};



