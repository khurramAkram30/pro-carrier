"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsFormSchema = void 0;
const JsonSchema = {
    type: "object",
    title: "Update The Pro Carrier",
    required: ["api_key"],
    properties: {
        api_key: {
            type: "string",
            title: "Api Key"
        }
    }
};
const UiSchema = {
    "ui:order": ["api_key"],
    api_key: {
        "ui:autofocus": true,
        "ui:help": "The api-key provided by carrier."
    }
};
exports.SettingsFormSchema = {
    JsonSchema,
    UiSchema
};
//# sourceMappingURL=setting-form.js.map