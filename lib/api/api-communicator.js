"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const connect_carrier_api_utils_1 = require("connect-carrier-api-utils");
const utils_1 = require("../helpers/utils");
const ProcessRequest = async (requestConfig, operationName) => {
    try {
        const axiosInstance = axios_1.default.create(requestConfig);
        (0, connect_carrier_api_utils_1.LogInfo)(`Sending ${operationName} request to the Pro Carrier API_URL ${requestConfig.url}`);
        const response = await axiosInstance.request(requestConfig);
        (0, utils_1.getCustomError)(response.data);
        (0, connect_carrier_api_utils_1.LogInfo)(`Received ${operationName} response from Pro Carrier: ${(JSON.stringify(response.data))}`);
        return response.data;
    }
    catch (error) {
        (0, utils_1.HandlesError)(error);
    }
};
exports.ProcessRequest = ProcessRequest;
//# sourceMappingURL=api-communicator.js.map