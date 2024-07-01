import { IGetShipmentInvoiceRequest } from "./get-shipment-interface";
import { ICreateLabelResponse } from "./create-label-response";

export interface IVoidlabelRequest extends IGetShipmentInvoiceRequest { 
}

export interface IVoidLabelResponse extends ICreateLabelResponse {
}