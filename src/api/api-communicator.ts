import axios, { AxiosRequestConfig } from 'axios';
import { CarrierOperation } from '../helpers/constants';
import { LogInfo } from 'connect-carrier-api-utils';

export const ProcessRequest = async<T>(requestConfig: AxiosRequestConfig, operationName: CarrierOperation ): Promise<T> => {
        const axiosInstance = axios.create(requestConfig);
        LogInfo(`Sending ${operationName} request to the Pro Carrier API_URL ${requestConfig.url}`);
        const response = await axiosInstance.request(requestConfig);
        LogInfo(`Received ${operationName} response from Pro Carrier: ${(JSON.stringify(response.data))}`);   
        console.log(response.status);
        return response.data;
   
      
}