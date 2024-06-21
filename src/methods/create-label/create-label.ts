import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    console.log(request);
    return;
}