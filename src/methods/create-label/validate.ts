import { CreateLabelRequest, DimensionDetails, Dimensions, Package, WeightDetails, WeightUnit } from "@shipengine/connect-carrier-api";
import { TermsOfTradeCode } from "@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code";
import { BadRequestError } from "@shipengine/connect-runtime";
import { MaximumGirth, MaximumLength, MaximumSum, MaximumWeight, ONE_POUND, SERVICE_API_CODES } from "../../helpers/constants";

export const validate = (request: CreateLabelRequest) => {
    if (request?.packages?.length > 1) {
        throw new BadRequestError("multipackage not supported");
    }

    if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelPlus) {
        if (request?.packages?.[0].customs?.terms_of_trade_code !== TermsOfTradeCode.DDP) {
            throw new BadRequestError("Only DDP is allowed");
        }
    }
    else {
        if (request?.packages?.[0].customs?.terms_of_trade_code.toLowerCase() != TermsOfTradeCode.DDP ||
            request?.packages?.[0].customs?.terms_of_trade_code.toLowerCase() != TermsOfTradeCode.DDU) {
            throw new BadRequestError("Only DDP and DDU are valid for terms_of_trade_code");
        }
    }

    if (!request?.ship_from?.country_code) {
        throw new BadRequestError("ShipFrom.Countrycode: It is mandatory");
    }

    if(request.packages?.[0]?.customs?.customs_items){
        const customItems=request.packages?.[0]?.customs?.customs_items;
        customItems.forEach((items) => {
            if (parseInt(items.value.amount) < 0){
                throw new BadRequestError("Custom items amount must be positive integer.");
            } 
        });
    }
    
    if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelPacket) {
        ValidatePackage(request);  
    }
    if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelExpress) {
        ValidatePackage(request);
    }
    if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelPlus) {
        ValidatePackage(request);
    }
    if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelPost) {
        ValidatePackage(request);
    }
};

const ValidatePackage = (request: CreateLabelRequest) => {
    if(request?.packages?.[0]){
        HandleWeightAndDimension(request.packages[0],request.service_code);
    }
};

const HandleWeightAndDimension = (request:Package, ser_code:string) => {
    if (request?.weight_details?.source_weight &&
        request?.weight_details?.source_weight_unit) {
        const sourceWeight = request.weight_details.source_weight;
        const sourceWeightUnit = request.weight_details.source_weight_unit;
        ValidateWeight(sourceWeight, sourceWeightUnit, MaximumWeight.ProCarrierParcelPacket);
    }
    if (request?.dimension_details?.dimensions_in_centimeters) {
        validateDimension(request?.dimension_details.dimensions_in_centimeters,
            MaximumLength.ProCarrierParcelPacket,
            ser_code);
    }
   
};

const ValidateWeight = (sourceWeight: number, sourceWeightUnit: WeightUnit, maximumWeight: number) => {
    if (sourceWeightUnit === WeightUnit.Kilograms && sourceWeight > maximumWeight) {
        throw new BadRequestError("Exceed Weight Limit");
    }
    if (sourceWeightUnit === WeightUnit.Pounds) {
        const convertToKg = ONE_POUND * sourceWeight;
        ValidateWeight(Number(convertToKg), WeightUnit.Kilograms, maximumWeight);
    }
};

const validateDimension = (dimension: Dimensions, maxLength: MaximumLength, service_code?: string) => {
    const height = dimension?.height;
    const width = dimension?.width;
    const length = dimension?.length;
    const girth = width + height * 2;
    const sum = height + width + length;
    if (length > maxLength) {
        throw new BadRequestError("Exceed the Limit of Length");
    }
    if (service_code === SERVICE_API_CODES.ProCarrierParcelPost) {
        if (girth > MaximumGirth.ProCarrierParcelPost) {
            throw new BadRequestError("Exceed the Limit of girth");
        }
    }
    if (service_code === SERVICE_API_CODES.ProCarrierParcelExpress) {
        if (girth > MaximumGirth.ProCarrierParcelPost) {
            throw new BadRequestError("Exceed the Limit of girth");
        }
        if (sum > MaximumSum.ProCarrierParcelExpress) {
            throw new BadRequestError(`Maximum Limit of L+H+W: ${MaximumSum.ProCarrierParcelExpress}`);
        }
    }
    if (service_code === SERVICE_API_CODES.ProCarrierParcelPacket ||
        service_code === SERVICE_API_CODES.ProCarrierParcelPlus) {
        if (sum > MaximumSum.ProCarrierParcelExpress) {
            throw new BadRequestError(`Maximum Limit of L+H+W: ${MaximumSum.ProCarrierParcelExpress}`);
        }
    }

};