import { Register, CreateLabel } from "./methods/";
import { Metadata } from "./definitions";
import { CarrierAppDefinition } from "@shipengine/connect-carrier-api";

export default {
    Metadata,
    Register,
    CreateLabel
} satisfies CarrierAppDefinition