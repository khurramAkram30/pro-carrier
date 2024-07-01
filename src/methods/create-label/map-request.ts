import { AxiosRequestConfig } from "axios"
import { COMMANDS, CUSTOM_CONTENTS, CarrierOperation, SERVICE_API_CODES, TEST_URL } from "../../helpers/constants";
import { CreateLabelReq, Products, Shipments} from "../../api/models/create-label-request";
import { 
    getAuthentication, 
    getLabelFormat, 
    getSenderAddress,
    getConsigneeAddress,
    getWeight,
    getWeightUnit
    } from "../../helpers/utils";
import { 
    CreateLabelRequest, 
    Customs,
    LabelFormatsEnum, 
    } from "@shipengine/connect-carrier-api";
import { IGetShipmentInvoiceRequest } from "../../api/models/get-shipment-interface";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { TermsOfTradeCode } from "@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code";

export const mapRequest = (request: CreateLabelRequest): AxiosRequestConfig => { 
    return {
        url:TEST_URL,
        method:"POST",
        data:orderShipment(request)
    };
}

export const isInternationalOrDomestic = (request: CreateLabelRequest): boolean =>{
    const shipTo = request?.ship_to;
    const shipFrom = request?.ship_from;   
    if (shipTo.country_code !== shipFrom.country_code ){
        return true;
    }
    else {
        return false;
    }
}

export const mapGetShipment = (request:CreateLabelRequest, response: ICreateLabelResponse) : AxiosRequestConfig => {
    
    return {
        url:TEST_URL,
        method:"POST",
        data:getShipmentInvoice(request,response)
    };
}

const getShipmentInvoice = (request:CreateLabelRequest, response:ICreateLabelResponse) : IGetShipmentInvoiceRequest => {
    return {
        Apikey: getAuthentication(request.metadata),
        Command: COMMANDS.GetShipment,
        Shipment: getShipmentData(response)
    } 
}

const getShipmentData = (response:ICreateLabelResponse) => {
    return {
        LabelFormat: LabelFormatsEnum.PDF,
        TrackingNumber : response.Shipment.TrackingNumber,
    }
}
 
const orderShipment = (data: CreateLabelRequest): CreateLabelReq => ({
        Apikey: getAuthentication(data?.metadata),
        Command: COMMANDS.OrderShipments,
        Shipment: getOrderShipment(data)
});

const getOrderShipment = (data : CreateLabelRequest) : Shipments  => {
    const packages = data?.packages[0];
    return {
        RequireCarrierTrackingNumber: true,
        LabelOption: "System",
        LabelFormat: getLabelFormat(data.label_format),
        ShipperReference: packages?.label_messages?.reference1,
        Service: data?.service_code,
        SenderAddress: getSenderAddress(data?.ship_from),
        ConsigneeAddress: getConsigneeAddress(data?.ship_to),
        Weight: getWeight(packages),
        WeightUnit: getWeightUnit(packages),
        Length: packages?.dimension_details?.dimensions_in_centimeters?.length,
        Width: packages?.dimension_details?.dimensions_in_centimeters?.width, 
        Height: packages?.dimension_details?.dimensions_in_centimeters?.height,
        DimUnit: "cm",
        Value: getCustoms(packages?.customs),
        Currency: getCurrency(packages?.customs),
        CustomsDuty:getCustomsDuty(packages?.customs,data?.service_code),
        Description: packages?.content_description,
        DeclarationType:getDeclaration(packages?.customs),
        Products:getProduct(packages.customs),
    };
};

const getCustoms = (packageCustoms: Customs): number => {
    const customItem = packageCustoms?.customs_items ?? [];
    let totalValue : number = 0;
    customItem.map(items => {
        totalValue += parseFloat(items.value?.amount) * (items.quantity);
        
    });
    return totalValue;
};

const getCurrency = (packageCustoms: Customs): string => {
    const currency = packageCustoms?.customs_items[0]?.value?.currency;
    if(currency){
        return currency;
    }
    else{
        return "GBP";
    }
};

const getCustomsDuty = (packageCustoms:Customs, ser_code:string): string => {
    const termsOfTradeCode: string = packageCustoms?.terms_of_trade_code?.toUpperCase() ?? "" ;
    if(termsOfTradeCode === TermsOfTradeCode.DDP){
        return TermsOfTradeCode.DDP;
    }
    if((ser_code.toUpperCase() === SERVICE_API_CODES.ProCarrierParcelPlus || ser_code === SERVICE_API_CODES.ProCarrierParcelPlusInternational) &&
        (!termsOfTradeCode)){
        return TermsOfTradeCode.DDP;
    }
    else{
        return  TermsOfTradeCode.DDU;
    }
    
}
const getDeclaration = (packageCustoms:Customs): string => {
    const content = packageCustoms.contents.toLowerCase() ?? "";
    if(content === CUSTOM_CONTENTS.Document){
        return CUSTOM_CONTENTS.Document.charAt(0).toUpperCase();
    }
    if(content === CUSTOM_CONTENTS.Sample){
        return CUSTOM_CONTENTS.CommercialSample;
    }
    if(content === CUSTOM_CONTENTS.gift){
        return CUSTOM_CONTENTS.gift.charAt(0).toUpperCase();
    }
    if(content === CUSTOM_CONTENTS.returnedgoods){
        return CUSTOM_CONTENTS.ReturnedGoods;
    }
    if(content === CUSTOM_CONTENTS.other){
        return CUSTOM_CONTENTS.Personal;
    }
    else{
       return CUSTOM_CONTENTS.SaleOfGood;
    }
}

const getProduct = (packageCustoms: Customs): Products[] => {
    const content = packageCustoms?.customs_items ?? [];
    let contentBody = [];
    content.forEach((customItem) => {
        let itemQuantity =  customItem?.quantity;
        let items : Products = {
            Description: customItem?.description,
            Sku: customItem?.sku,
            HsCode:customItem?.harmonized_tariff_code,
            Quantity: itemQuantity,
            Value: itemQuantity * parseInt(customItem?.value?.amount),
            OriginCountry: customItem?.country_of_origin,
            PurchaseUrl: customItem?.product_url
        }
        contentBody.push(items);
    });
    
    return contentBody;
}