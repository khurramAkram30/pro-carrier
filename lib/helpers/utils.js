"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlesError = exports.getCustomError = exports.getCommand = exports.getAuthentication = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const axios_1 = require("axios");
const constants_1 = require("./constants");
const getAuthentication = (data) => {
    return data === null || data === void 0 ? void 0 : data.api_key;
};
exports.getAuthentication = getAuthentication;
const getCommand = (data) => {
    const command = data;
    switch (command) {
        case constants_1.CarrierOperation.CreateLabel:
            return constants_1.Commands.OrderShipments;
            break;
        case constants_1.CarrierOperation.GetShipment:
            return constants_1.Commands.GetShipment;
            break;
    }
};
exports.getCommand = getCommand;
const getCustomError = (err) => {
    const customError = err.Error;
    if (customError === "Access Denied") {
        throw new connect_runtime_1.UnauthorizedError('Error from Carrier Api', [
            {
                errorCode: err.ErrorLevel,
                message: "Access denied"
            }
        ]);
    }
};
exports.getCustomError = getCustomError;
const HandlesError = (error) => {
    const errorCode = [];
    if (error === null || error === void 0 ? void 0 : error.details) {
        errorCode.push({
            errorCode: error.details[0].errorCode,
            message: error.details[0].message
        });
    }
    if (error.statusCode === axios_1.HttpStatusCode.Unauthorized) {
        throw new connect_runtime_1.UnauthorizedError("Message From Carrier Api", errorCode);
    }
};
exports.HandlesError = HandlesError;
//# sourceMappingURL=utils.js.map