import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";
import { mapRequest } from "./map-request";

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    const mapedRequest = mapRequest(request); 
    console.log(mapedRequest);    
    return;
}