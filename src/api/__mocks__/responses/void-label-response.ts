import { IVoidLabelResponse } from '../../models/void-label-interface'

export const voidLabelSuccessResponse: IVoidLabelResponse = {
    ErrorLevel: 0,
    Shipment: {
        Id: "51094437",
        TrackingNumber: "DG30561009729",
        ShipperReference: "",
    },
}

export const voidLabelRequiredResponse = {
    ErrorLevel: 10,
    Error: "Invalid request - TrackingNumber or ShipperReference required",
}

export const voidLabelErrorResponse = {
    ErrorLevel: 10,
    Error: "Shipment not found (invalid)",
}