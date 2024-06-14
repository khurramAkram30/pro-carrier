"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResponse = void 0;
const mapResponse = (registration_info) => {
    return {
        credentials: {
            username: registration_info.api_key,
            password: "******"
        },
        metadata: {
            api_key: registration_info.api_key
        }
    };
};
exports.mapResponse = mapResponse;
//# sourceMappingURL=map-response.js.map