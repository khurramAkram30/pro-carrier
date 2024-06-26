import axios, { AxiosRequestConfig } from 'axios';
import { CarrierOperation } from '../helpers/constants';
import { LogInfo } from 'connect-carrier-api-utils';
import { HandleError } from '../helpers/utils';

export const ProcessRequest = async<T>(requestConfig: AxiosRequestConfig, operationName: CarrierOperation): Promise<T> => {
        try {
                const axiosInstance = axios.create(requestConfig);
                LogInfo(`Sending ${operationName} request to the Pro Carrier API_URL ${requestConfig.url}`);
                
                const response = await axiosInstance.request(requestConfig);
                LogInfo(`Received ${operationName} response from Pro Carrier: ${(JSON.stringify(response.data))}`);

                return response.data;
        } catch (error) {
                // HandleError(error);
        }


}