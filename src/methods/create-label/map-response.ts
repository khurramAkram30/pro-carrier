import { CreateLabelRequest, CreateLabelResponse, Document, DocumentFormat, DocumentType, LabelPackage, Package, PackageType } from "@shipengine/connect-carrier-api";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { IGetShipmentResponse } from "../../api/models/get-shipment-interface";

export const mapResponse = (
    orderShipment: ICreateLabelResponse,
    request: CreateLabelRequest,
    getShipmentInvoice?: IGetShipmentResponse,
): CreateLabelResponse => {
    const documents: Document[] = getShipmentInvoice?.Shipment ? [
        {
            format: DocumentFormat.Pdf,
            type: [DocumentType.CommercialInvoice],
            data: getShipmentInvoice?.Shipment?.LabelImage
        }
    ] : [];
    const packages: LabelPackage[] = [
        {
            tracking_number:orderShipment.Shipment.TrackingNumber,
            documents:[
             { 
                format:getDocuments(orderShipment?.Shipment?.LabelFormat),
                type:[DocumentType.Label],
                data:orderShipment.Shipment.LabelImage,
             }   
            ]
        }
    ]
    return {
        transaction_id: request?.transaction_id,
        tracking_number: orderShipment?.Shipment?.TrackingNumber,
        documents: documents,
        trackable: true,
        packages: packages,
        metadata: request?.metadata
    }
}

const getDocuments = (label_format: string): DocumentFormat => {
    switch (label_format) {
        case 'zpl':
            return DocumentFormat.Zpl;
        case 'png':
            return DocumentFormat.Png;
        default:
            return DocumentFormat.Pdf;
    }
}