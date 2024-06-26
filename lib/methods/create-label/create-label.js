"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLabel = void 0;
const map_request_1 = require("./map-request");
const api_communicator_1 = require("../../api/api-communicator");
const constants_1 = require("../../helpers/constants");
const CreateLabel = async (request) => {
    const mapedRequest = (0, map_request_1.mapRequest)(request);
    try {
        const response = await (0, api_communicator_1.ProcessRequest)(mapedRequest, constants_1.CarrierOperation.CreateLabel);
        const result = response;
        return;
    }
    catch (error) {
    }
};
exports.CreateLabel = CreateLabel;
//# sourceMappingURL=create-label.js.map