"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const uuid_1 = require("uuid");
const mapResponse = (registration_info) => {
    return {
        credentials: {
            username: (0, uuid_1.v6)(),
            password: "******"
        },
        metadata: {
            api_key: registration_info.api_key
        }
    };
};
exports.mapResponse = mapResponse;
//# sourceMappingURL=map-response.js.map