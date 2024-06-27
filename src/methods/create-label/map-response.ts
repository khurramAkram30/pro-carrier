import { CreateLabelResponse, Document, DocumentFormat, DocumentType, LabelPackage, Package, PackageType } from "@shipengine/connect-carrier-api";
import { ICreateLabelResponse } from "../../api/models/create-label-response";
import { IGetShipmentResponse } from "../../api/models/get-shipment-response";
import { InternalReqRegister } from "../../helpers/internal-models";

export const mapResponse = (
    orderShipment: ICreateLabelResponse,
    metadata: InternalReqRegister,
    getShipmentInvoice?: IGetShipmentResponse,
): CreateLabelResponse => {
    const documents: Document[] = getShipmentInvoice?.Shipment ? [
        {
            data: getShipmentInvoice?.Shipment?.LabelImage,
            format: DocumentFormat.Pdf,
            type: [DocumentType.CommercialInvoice]
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
        transaction_id: "",
        tracking_number: orderShipment?.Shipment?.TrackingNumber,
        documents: documents,
        trackable: true,
        packages: packages,
        metadata: metadata
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