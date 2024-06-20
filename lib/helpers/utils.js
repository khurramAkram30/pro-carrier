"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlesError = exports.getCustomError = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const axios_1 = require("axios");
const getCustomError = (err) => {
    const customError = err === null || err === void 0 ? void 0 : err.Error;
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