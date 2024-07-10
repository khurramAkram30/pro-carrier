import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";
import { mapGetShipmentInvoiceRequest, mapRequest, isInternationals, getShipmentError } from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";
import { HandleError } from "../../helpers/utils";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { mapResponse } from "./map-response";
import { validate } from "./validate";
import { IGetShipmentResponse } from "../../api/models/get-shipment-interface";


export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    validate(request);
    let getShipmentResponse;
    const metadata = request?.metadata;
    const shipFrom = request?.ship_from;
    const mappedRequest = mapRequest(request);

    const shipmentResponse = await ProcessRequest<ICreateLabelResponse>(mappedRequest, CarrierOperation.CreateLabel);
    if (shipmentResponse.ErrorLevel === 0) {
        const isInternational: boolean = isInternationals(request);
        if (isInternational) {
            const mappedGetShipmentReq = mapGetShipmentInvoiceRequest(request, shipmentResponse);
            getShipmentResponse = await ProcessRequest<IGetShipmentResponse>(mappedGetShipmentReq, CarrierOperation.GetShipment);
            if(getShipmentResponse.ErrorLevel === 1){
                getShipmentError(getShipmentResponse,shipFrom,metadata);
            }
            if(getShipmentResponse.ErrorLevel === 10){
                HandleError(getShipmentResponse);
            }
        }
        const mappedGetShipmentRes = mapResponse(shipmentResponse, request, getShipmentResponse);
        return mappedGetShipmentRes;
    }
    else if (shipmentResponse.ErrorLevel === 1) {
        getShipmentError(shipmentResponse,shipFrom,metadata);
    }
    else {
        HandleError(shipmentResponse);
    }


}