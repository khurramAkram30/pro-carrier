import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";
import { mapGetShipment, mapRequest, isInternationalOrDomestic} from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";
import { HandleError } from "../../helpers/utils";
import { ExternalServerError } from "@shipengine/connect-runtime";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { mapResponse } from "./map-response";
import { validate } from "./validate";
import { IGetShipmentResponse } from "../../api/models/get-shipment-interface";

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    validate(request);
    const metadata = request?.metadata;
    const mapedRequest = mapRequest(request); 
    try {
        const shipmentResponse = await ProcessRequest<ICreateLabelResponse>(mapedRequest,CarrierOperation.CreateLabel);
        HandleError(shipmentResponse);
        const isInternational: boolean = isInternationalOrDomestic(request);
        if(isInternational){
            const mappedGetShipmentReq = mapGetShipment(request,shipmentResponse);
            const getShipmentResponse = await ProcessRequest<IGetShipmentResponse>(mappedGetShipmentReq,CarrierOperation.GetShipment);
            const mappedGetShipmentRes = mapResponse(shipmentResponse,metadata,getShipmentResponse);
            
            return mappedGetShipmentRes;
        }
        else{  
            const mappedOrderShipmentRes = mapResponse(shipmentResponse,metadata);
            return mappedOrderShipmentRes;
        }
        return;
        
    } catch (error) {
        throw new ExternalServerError(error?.details?.[0].message);
    }
}