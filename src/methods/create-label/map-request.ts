import { AxiosRequestConfig } from "axios"
import { CARRIER_METHODS, CUSTOM_CONTENTS, SERVICE_API_CODES, TEST_URL } from "../../helpers/constants";
import { CreateLabelReq, Products, Shipments} from "../../api/models/create-label-request";
import { 
    getAuthentication, 
    getLabelFormat, 
    getSenderAddress,
    getConsigneeAddress,
    getWeight,
    getWeightUnit,
    HandleError
    } from "../../helpers/utils";
import { 
    CreateLabelRequest, 
    Customs,
    CustomsContentTypes,
    LabelFormatsEnum,
    ShipFrom,
    VoidLabelsRequest, 
    } from "@shipengine/connect-carrier-api";
import { IGetShipmentInvoiceRequest, IGetShipmentResponse } from "../../api/models/get-shipment-interface";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { TermsOfTradeCode } from "@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code";
import { v4 as uuidv4 } from 'uuid';
import { InternalReqRegister } from "../../helpers/internal-models";
import { VoidLabels } from "../void-label/void-label";

export const mapRequest = (request: CreateLabelRequest): AxiosRequestConfig => { 
    return {
        url:TEST_URL,
        method:"POST",
        data:orderShipment(request)
    };
}

export const isInternationals = (request: CreateLabelRequest): boolean =>{
    const shipTo = request?.ship_to;
    const shipFrom = request?.ship_from;   
    if (shipTo.country_code !== shipFrom.country_code ){
        return true;
    }
    else {
        return false;
    }
}

export const mapGetShipmentInvoiceRequest = (request:CreateLabelRequest, response: ICreateLabelResponse) : AxiosRequestConfig => {
    
    return {
        url:TEST_URL,
        method:"POST",
        data:getShipmentInvoice(request,response)
    };
}

const getShipmentInvoice = (request:CreateLabelRequest, response:ICreateLabelResponse) : IGetShipmentInvoiceRequest => {
    return {
        Apikey: getAuthentication(request.metadata),
        Command: CARRIER_METHODS.GetShipment,
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
        Command: CARRIER_METHODS.OrderShipments,
        Shipment: getOrderShipment(data)
});

const getOrderShipment = (data : CreateLabelRequest): Shipments  => {
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
        Value: getValue(packages?.customs),
        Currency: getCurrency(packages?.customs),
        CustomsDuty:getCustomsDuty(packages?.customs,data?.service_code),
        Description: packages?.content_description,
        DeclarationType:getDeclaration(packages?.customs),
        Products:getProducts(packages.customs),
    };
};

const getValue = (packageCustoms: Customs): number => {
    const customItem = packageCustoms?.customs_items ?? [];
    let totalValue : number = 0;
    customItem.map(items => {
        totalValue += parseFloat(items.value?.amount) * (items.quantity ?? 1);
        
    });
    return totalValue;
};

const getCurrency = (packageCustoms: Customs): string => {
    return packageCustoms?.customs_items[0]?.value?.currency ?? "GBP"
};

const getCustomsDuty = (packageCustoms:Customs, ser_code:string): string => {
    const termsOfTradeCode: string = packageCustoms?.terms_of_trade_code ?? "" ;
    if(termsOfTradeCode === TermsOfTradeCode.DDP){
        return TermsOfTradeCode.DDP;
    }
    if((ser_code === SERVICE_API_CODES.ProCarrierParcelPlus) && (!termsOfTradeCode)){
        return TermsOfTradeCode.DDP;
    }
    return  TermsOfTradeCode.DDU;
    
};  

const getDeclaration = (packageCustoms: Customs): string => {
    const content = packageCustoms.contents.toLowerCase() ?? "";
    if(content === CustomsContentTypes.Documents){
        return CUSTOM_CONTENTS.Document;
    }
    if(content === CustomsContentTypes.Sample){
        return CUSTOM_CONTENTS.CommercialSample;
    }
    if(content === CustomsContentTypes.Gift){
        return CUSTOM_CONTENTS.gift;
    }
    if(content === CustomsContentTypes.ReturnedGoods){
        return CUSTOM_CONTENTS.ReturnedGoods;
    }
    if(content === CustomsContentTypes.Other){
        return CUSTOM_CONTENTS.Personal;
    }
    else{
       return CUSTOM_CONTENTS.SaleOfGood;
    }
}

const getProducts = (packageCustoms: Customs): Products[] => {
    const content = packageCustoms?.customs_items ?? [];
    let contentBody = [];
    content.forEach((customItem) => {
        let itemQuantity =  customItem?.quantity ?? 1;
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

export const getShipmentError = (request: IGetShipmentResponse | ICreateLabelResponse, ShipFrom:ShipFrom , metadata:InternalReqRegister) =>{
    const trackingNumber = request.Shipment.TrackingNumber;
    const voidLableReqMapping = VoidLabelMapping(trackingNumber, ShipFrom , metadata);
    VoidLabels(voidLableReqMapping);
    HandleError(request);
}

export const VoidLabelMapping = (trackingNumber: string, shipFrom: ShipFrom ,metadata: InternalReqRegister): VoidLabelsRequest => {
    return {
        transaction_id:"",
        void_requests: [
            {
                tracking_number:trackingNumber,
                void_request_id: uuidv4(),
                ship_from:{
                    country_code:shipFrom.country_code,
                    postal_code:shipFrom.postal_code,
                },
            }   
        ],
        metadata:metadata
    }
}

