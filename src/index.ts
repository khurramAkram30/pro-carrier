import { Register, CreateLabel,VoidLabels,Track } from "./methods/";
import { Metadata } from "./definitions";
import { CarrierAppDefinition } from "@shipengine/connect-carrier-api";

export default {
    Metadata,
    Register,
    CreateLabel,
    VoidLabels,
    Track
} satisfies CarrierAppDefinition