const JsonSchema = {
    type: "object",
    title: "Connect The Pro Carrier",
    required: ["api_key"],
    properties: {
        api_key: {
            type: "string",
            title: "Api Key"
        }

    }
};

const UiSchema = {
    "ui:order":["api_key"],
    api_key: {
        "ui:autofocus": true,
        "ui:help": "The api-key provided by carrier."
    }

}

export const RegistrationFormSchema = {
    JsonSchema,
    UiSchema
}
