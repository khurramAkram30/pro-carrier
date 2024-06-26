import { BaseResponse } from "@shipengine/connect-carrier-api/lib/responses/base-response";

export interface CreateLabelRes extends BaseResponse {
    tracking_number: string;
    documents: Documents[];
    Trackable: boolean;
    packages:Packages[];
}

export interface Documents {
    type: string[];
    data: string;
    format: string
}
export interface Packages {
    tracking_number: string;
    documents:Documents[];

}   