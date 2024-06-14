import { IRegisterRequest } from "../../api/models/register-interface"; 
import { TEST_URL } from "../../helpers/constants";
import { Axios, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const API_URL = TEST_URL;

export const mapRequest = (registration_info): AxiosRequestConfig => {
    const registerRequest: IRegisterRequest = {
        Apikey: registration_info.api_key,
        Command: "OrderShipment",
        Shipment:
        {
            LabelOption: "LabelOption",
            ShipperReference: ""
        }
    } 

    return {
        responseType: "json",
        method: "POST",
        url:API_URL,
        data:registerRequest
    }
}
