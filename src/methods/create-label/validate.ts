import { CreateLabelRequest, DimensionDetails, Dimensions, Package, WeightDetails, WeightUnit } from "@shipengine/connect-carrier-api";
import { TermsOfTradeCode } from "@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code";
import { BadRequestError } from "@shipengine/connect-runtime";
import { MaximumGirth, MaximumLength, MaximumDimensionSum, MaximumWeight, ONE_POUND, SERVICE_API_CODES } from "../../helpers/constants";

export const validate = (request: CreateLabelRequest) => {

  const termsOfTradeCode = request?.packages?.[0].customs?.terms_of_trade_code.toLowerCase();
  const customItems = request.packages?.[0]?.customs?.customs_items;

  if (request?.service_code === SERVICE_API_CODES.ProCarrierParcelPlus) {
    if (termsOfTradeCode !== TermsOfTradeCode.DDP) {
      throw new BadRequestError(`Only DDP is allowed for this service: ${SERVICE_API_CODES.ProCarrierParcelPlus}`);
    }
  }
  else {
    if (termsOfTradeCode != TermsOfTradeCode.DDU && termsOfTradeCode != TermsOfTradeCode.DDP) {
      throw new BadRequestError("Only DDP and DDU are valid for terms of trade code");
    }
  }

  if (customItems) {
    customItems.forEach((items) => {
      if (parseInt(items.value.amount) <= 0) {
        throw new BadRequestError("Custom items amount must be present");
      }
    });
  }

  if (request?.packages?.[0]) {
    HandleWeightAndDimension(request.packages[0], request.service_code);
  }
};

const HandleWeightAndDimension = (request: Package, serviceCode: string) => {
  if (request?.weight_details?.source_weight &&
    request?.weight_details?.source_weight_unit) {
    ValidateWeight(request.weight_details.source_weight, request.weight_details.source_weight_unit, getMaximumWeight(serviceCode));
  }
  if (request?.dimension_details?.dimensions_in_centimeters) {
    validateDimension(request?.dimension_details.dimensions_in_centimeters,
      getMaximumLength(serviceCode),
      serviceCode);
  }

};

export const ValidateWeight = (sourceWeight: number, sourceWeightUnit: WeightUnit, maximumWeight: number) => {
  if (sourceWeightUnit === WeightUnit.Kilograms && sourceWeight > maximumWeight) {
    throw new BadRequestError("Exceed Weight Limit");
  }
  if (sourceWeightUnit === WeightUnit.Pounds) {
    const convertToKg = ONE_POUND * sourceWeight;
    ValidateWeight(Number(convertToKg), WeightUnit.Kilograms, maximumWeight);
  }
};

export const validateDimension = (dimension: Dimensions, maxLength: number, serviceCode?: string) => {
  const height = dimension?.height || 0;
  const width = dimension?.width || 0;
  const length = dimension?.length || 0;
  const girth = width + height * 2;
  const sum = height + width + length;

  if (length > maxLength) {
    throw new BadRequestError("Exceed the Limit of Length");
  }

  switch (serviceCode) {
    case SERVICE_API_CODES.ProCarrierParcelPost:
      valaidateGirth(girth,MaximumGirth.ProCarrierParcelPost);
      break;
    case SERVICE_API_CODES.ProCarrierParcelExpress:
      valaidateGirth(girth,MaximumGirth.ProCarrierParcelExpress);  
      valaidateSum(sum,MaximumDimensionSum.ProCarrierParcelExpress);
      break;
    case SERVICE_API_CODES.ProCarrierParcelPacket:
      valaidateSum(sum,MaximumDimensionSum.ProCarrierParcelPacket);
      break;
    case SERVICE_API_CODES.ProCarrierParcelPlus:
      valaidateSum(sum,MaximumDimensionSum.ProCarrierParcelPlus);
      break;
    default:
      break;
  }
};

const valaidateSum = (totalSum: number, maximumSum:MaximumDimensionSum) =>  {
  if (totalSum > maximumSum) {
    throw new BadRequestError("Exceed the Limit of girth");
  }
}

const valaidateGirth = (girth: number, maximumGirth:MaximumGirth) =>  {
  if (girth > maximumGirth) {
    throw new BadRequestError("Exceed the Limit of girth");
  }
}

export const getMaximumWeight = (serviceCode: string) => {
  switch (serviceCode) {
    case SERVICE_API_CODES.ProCarrierParcelPacket:
      return MaximumWeight.ProCarrierParcelPacket;
    case SERVICE_API_CODES.ProCarrierParcelExpress:
      return MaximumWeight.ProCarrierParcelExpress;
    case SERVICE_API_CODES.ProCarrierParcelPlus:
      return MaximumWeight.ProCarrierParcelPlus;
    case SERVICE_API_CODES.ProCarrierParcelPost:
      return MaximumWeight.ProCarrierParcelPost;
    default:
  }
};

export const getMaximumLength = (serviceCode: string) => {
  switch (serviceCode) {
    case SERVICE_API_CODES.ProCarrierParcelPacket:
      return MaximumLength.ProCarrierParcelPacket;
    case SERVICE_API_CODES.ProCarrierParcelExpress:
      return MaximumLength.ProCarrierParcelExpress;
    case SERVICE_API_CODES.ProCarrierParcelPlus:
      return MaximumLength.ProCarrierParcelPlus;
    case SERVICE_API_CODES.ProCarrierParcelPost:
      return MaximumLength.ProCarrierParcelPost;
    default:
  }
};

