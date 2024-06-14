"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const constants_1 = require("../../helpers/constants");
const validate_1 = require("./validate");
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const map_response_1 = require("./map-response");
const Register = async (request) => {
    const registration_info = request.registration_info;
    (0, validate_1.validate)(registration_info);
    try {
        const thirdParty = (0, map_request_1.mapRequest)(registration_info);
        await (0, api_communicator_1.ProcessRequest)(thirdParty, constants_1.CarrierOperation.Register);
    }
    catch (error) {
    }
    return (0, map_response_1.mapResponse)(registration_info);
};
exports.Register = Register;
//# sourceMappingURL=register.js.map