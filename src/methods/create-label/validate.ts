import { CreateLabelRequest } from "@shipengine/connect-carrier-api";
import { TermsOfTradeCode } from "@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code";
import { BadRequestError } from "@shipengine/connect-runtime";
import { SERVICE_API_CODES } from "../../helpers/constants";

export const validate = (request: CreateLabelRequest) => {
    if (request?.packages?.length > 1) {
        throw new BadRequestError("multipackage not supported");
    }

    if (request?.packages?.[0].customs?.terms_of_trade_code === TermsOfTradeCode.DDP
        ||
        request?.packages?.[0].customs?.terms_of_trade_code === TermsOfTradeCode.DDU) {
        throw new BadRequestError("Only DDP and DDU are valid for terms_of_trade_code ");
    }

    if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelPlus
        ||
        request?.service_code === SERVICE_API_CODES.ProCarrierParcelPlusInternational) {
 
    }
}