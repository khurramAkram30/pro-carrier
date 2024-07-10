import { AxiosRequestConfig } from "axios";
import { CarrierOperation } from "../../helpers/constants";
import { RegisterSuccessResponse, RegisterErrorResponse } from "./responses/register-response"; 
import { track } from "./responses/track-response";
import { voidLabelErrorResponse, voidLabelRequiredResponse, voidLabelSuccessResponse } from "./responses/void-label-response";
import { CreateLabelResponse, GetShipmentResponse } from "./responses/create-label-response";

export const ProcessRequest = async(requestConfig: AxiosRequestConfig, operationName: CarrierOperation) => {
    
    switch(operationName){
        case CarrierOperation.Register:
            if(requestConfig?.data?.Apikey !== 'Apikey'){
                return RegisterErrorResponse;
            }
            else{
                return RegisterSuccessResponse;
            }    
        case CarrierOperation.CreateLabel:
            return CreateLabelResponse;
        case CarrierOperation.GetShipment:
            return GetShipmentResponse;
        case CarrierOperation.Track:
            return track;
        case CarrierOperation.VoidLabel:
            if(requestConfig?.data?.Shipment?.TrackingNumber == ""){
                return voidLabelRequiredResponse;
            }
            if(requestConfig?.data?.Shipment?.TrackingNumber != "DG30561009729"){
                return voidLabelErrorResponse;
            }
            else{
                return voidLabelSuccessResponse;
            }
            

    }
}