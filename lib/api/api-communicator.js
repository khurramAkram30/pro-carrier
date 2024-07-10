"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../helpers/constants");
const connect_carrier_api_utils_1 = require("connect-carrier-api-utils");
const connect_runtime_1 = require("@shipengine/connect-runtime");
const ProcessRequest = async (requestConfig, operationName) => {
    const axiosInstance = axios_1.default.create(requestConfig);
    (0, connect_carrier_api_utils_1.LogInfo)(`Sending ${operationName} request to the Pro Carrier API_URL ${requestConfig.url}`);
    try {
        const response = await axiosInstance.request(requestConfig);
        (0, connect_carrier_api_utils_1.LogInfo)(`Received ${operationName} response from Pro Carrier: ${(JSON.stringify(response.data))}`);
        return response.data;
    }
    catch (error) {
        if (operationName === constants_1.CarrierOperation.VoidLabel) {
            return error;
        }
        throw new connect_runtime_1.ExternalServerError(error);
    }
};
exports.ProcessRequest = ProcessRequest;
//# sourceMappingURL=api-communicator.js.map