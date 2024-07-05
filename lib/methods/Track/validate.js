"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const utils_1 = require("../../helpers/utils");
const connect_runtime_1 = require("@shipengine/connect-runtime");
const validate = (request) => {
    if (!(0, utils_1.getIdentifierValue)(request, 'tracking_number')) {
        throw new connect_runtime_1.BadRequestError("Please provide tracking_number");
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map