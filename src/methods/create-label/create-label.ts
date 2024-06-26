import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";
import { mapRequest } from "./map-request";
import { ProcessRequest } from "../../api/api-communicator";
import { CarrierOperation } from "../../helpers/constants";

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    const mapedRequest = mapRequest(request); 
    try {
        const response = await ProcessRequest(mapedRequest,CarrierOperation.CreateLabel);
        const result = response; 
        return;
        
    } catch (error) {
        
    }
}