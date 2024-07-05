import { ITrackResponse } from "../../models/track-interface";

export const track: ITrackResponse = {
    ErrorLevel: 0,
    Shipment: {
        Id: "50891536",
        TrackingNumber: "DG30561009726",
        ShipperReference: "",
        DisplayId: "",
        Service: "PCPE",
        Carrier: "UPS Standard",
        CarrierTrackingNumber: "1ZXXXXXXXXXXXXXXXX",
        CarrierLocalTrackingNumber: "1ZXXXXXXXXXXXXXXXX",
        CarrierBarcodeNumber: "1ZXXXXXXXXXXXXXXXX",
        CarrierTrackingUrl: "https://www.ups.com/track?track=yes&trackNums=1ZXXXXXXXXXXXXXXXX&loc=en_US&requester=ST/trackdetails",
        Weight: 2,
        WeightUnit: "kg",
        ShipperAddress: {
            Name: "David Beckham",
            Company: "Old Trafford",
            City: "Manchester",
            Zip: "M16 9WA",
            Country: "GB",
        },
        ConsigneeAddress: {
            Name: "Edward RM6",
            Company: "Bohemia Bar",
            City: "Madrid",
            Zip: "28012",
            Country: "ES",
        },
        Events: [
            {
                DateTime: "2024-07-02 14:21:47",
                Country: "",
                Code: "AAY",
                Description: "Pre-advice received",
                CarrierCode: "",
                CarrierDescription: "",
            },
        ],
    },
}
