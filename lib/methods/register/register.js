"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const constants_1 = require("../../helpers/constants");
const validate_1 = require("./validate");
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const map_response_1 = require("./map-response");
const utils_1 = require("../../helpers/utils");
const Register = async (request) => {
    const registrationInfo = request.registration_info || {};
    (0, validate_1.validate)(registrationInfo);
    const mapedRequest = (0, map_request_1.mapRequest)(registrationInfo);
    const response = await (0, api_communicator_1.ProcessRequest)(mapedRequest, constants_1.CarrierOperation.Register);
    (0, utils_1.getCarrierError)(response);
    return (0, map_response_1.mapResponse)(registrationInfo);
};
exports.Register = Register;
//# sourceMappingURL=register.js.map