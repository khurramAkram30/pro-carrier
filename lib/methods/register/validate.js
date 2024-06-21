"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const connect_runtime_1 = require("@shipengine/connect-runtime");
const validate = (registration_info) => {
    if (!registration_info.api_key) {
        throw new connect_runtime_1.BadRequestError('Api Key Required');
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map