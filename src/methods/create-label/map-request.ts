import { Axios, AxiosRequestConfig } from "axios"
import { CUSTOM_CONTENTS, CarrierOperation, SERVICE_API_CODES, TEST_URL, TRADE_CODE } from "../../helpers/constants";
import { ConsigneeAddress, CreateLabelReq, Products, SenderAddress, Shipments} from "../../api/models/create-label-interface";
import { 
    getAuthentication, 
    getCommand, 
    getLabelFormat, 
    getSenderAddress,
    getConsigneeAddress,
    getWeight,
    getWeightUnit
    } from "../../helpers/utils";
import { 
    CreateLabelRequest, 
    Customs, 
    } from "@shipengine/connect-carrier-api";

export const mapRequest = (request: CreateLabelRequest): AxiosRequestConfig => { 
    return {
        url:TEST_URL,
        method:"POST",
        data:orderShipment(request)
    };
}

const orderShipment = (data: CreateLabelRequest): CreateLabelReq => ({
        ApiKey: getAuthentication(data.metadata),
        Command: getCommand(CarrierOperation.CreateLabel),
        Shipments: getShipment(data)
});

const getShipment = (data : CreateLabelRequest) : Shipments  => {
    const packages = data?.packages[0];
    return {
        RequireCarrierTrackingNumber: true,
        LabelOption: "System",
        LabelFormat: getLabelFormat(data.label_format),
        ShipperReference: packages?.label_messages?.reference1,
        Service: data?.service_code,
        SenderAddress: getSenderAddress(data.ship_from),
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
    const customItem = packageCustoms?.customs_items;
    let totalValue: number ;
    customItem.map((val, index) => {
        totalValue += Number(customItem[index]?.value?.amount) * Number(customItem[index]?.quantity);
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
    const termsOfTradeCode: string = packageCustoms.terms_of_trade_code.toUpperCase();
    if(termsOfTradeCode === TRADE_CODE.DDP){
        return TRADE_CODE.DDP;
    }
    if((ser_code.toUpperCase() === SERVICE_API_CODES.ProCarrierParcelPlus || ser_code === SERVICE_API_CODES.ProCarrierParcelPlusInternational) &&
        (!termsOfTradeCode)){
        return TRADE_CODE.DDP;
    }
    else{
        return  TRADE_CODE.DDU;
    }
    
}
const getDeclaration = (packageCustoms:Customs): string => {
    const content = packageCustoms.contents.toLowerCase();
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
    const content = packageCustoms.customs_items;
    let contentBody = [];
    content.forEach((customItem) => {
        let itemQuantity =  customItem?.quantity;
        let items : Products = {
            Description: customItem?.description,
            Sku: customItem?.sku,
            HsCode:parseInt(customItem?.harmonized_tariff_code),
            Quantity: itemQuantity,
            Value: itemQuantity * parseInt(customItem?.value?.amount),
            OriginCountry: customItem?.country_of_origin,
            PurchaseUrl: customItem?.product_url
        }
        contentBody.push(items);
    });
    
    return contentBody;
}