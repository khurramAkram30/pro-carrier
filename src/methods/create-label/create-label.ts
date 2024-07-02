import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";
import { mapGetShipment, mapRequest, isInternationalOrDomestic, VoidLabelMapping } from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";
import { HandleError } from "../../helpers/utils";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { mapResponse } from "./map-response";
import { validate } from "./validate";
import { IGetShipmentResponse } from "../../api/models/get-shipment-interface";
import { VoidLabels } from "../void-label/void-label";


export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    validate(request);
    let getShipmentResponse;
    const metadata = request?.metadata;
    const mapedRequest = mapRequest(request);

    const shipmentResponse = await ProcessRequest<ICreateLabelResponse>(mapedRequest, CarrierOperation.CreateLabel);
    const isInternational: boolean = isInternationalOrDomestic(request);
    if (isInternational) {
        const mappedGetShipmentReq = mapGetShipment(request, shipmentResponse);
        getShipmentResponse = await ProcessRequest<IGetShipmentResponse>(mappedGetShipmentReq, CarrierOperation.GetShipment);
    }

    if (shipmentResponse.ErrorLevel === 0) {
        const mappedGetShipmentRes = mapResponse(shipmentResponse, metadata, getShipmentResponse);
        return mappedGetShipmentRes;
    }
    else if (shipmentResponse.ErrorLevel === 1 || getShipmentResponse.ErrorLevel === 1) {
        const trackingNumber = shipmentResponse.Shipment.TrackingNumber;
        const voidLableReqMapping = VoidLabelMapping(trackingNumber, request.ship_from, metadata);
        VoidLabels(voidLableReqMapping);
        HandleError(shipmentResponse);
    }
    else {
        HandleError(shipmentResponse);
    }


}