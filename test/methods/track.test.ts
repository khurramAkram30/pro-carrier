import { StandardizedStatusCodes, TrackingRequest } from "@shipengine/connect-carrier-api";
import { Track } from "../../src/methods/Track/track";

jest.mock('../../src/api/api-communicator');

let trackingRequest: TrackingRequest;

beforeEach(() => {
    trackingRequest = {
        transaction_id: "tracking-123",
        identifiers: [
            {
                type: 'tracking_number',
                value: 'DG30561009726'
            }
        ],
        metadata: {
            api_key: "Apikey",
        }
    }
});

describe('Unit test of tracking method', () => {
    test('validate tracking Number', async () => {
        //Arrange
        trackingRequest.identifiers![0].value = "";

        //Act
        const result = await Track(trackingRequest).catch(e => e);

        // Assert
        expect(result.message).toBe('Please provide tracking_number');
    });

    test("Get tracking number from API ", async () => {
        //Act
        var result = await Track(trackingRequest);
        //Assert
        expect(result.tracking_info.tracking_number).toBe("DG30561009726");
    });

    test('Check standardized_status_code', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.standardized_status_code).toBe(StandardizedStatusCodes.InTransit);
    });

    test('Check Carrier Status Code', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.carrier_status_code).toBe("AAY");
    });

    test('Check Carrier Status Description', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.carrier_status_description).toBe("Pre-advice received");
    });
    
    test('Check Actual delivery datetime', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.actual_delivery_datetime).toBe("2024-07-02 14:21:47");
    });

    test('Check Events[0].event_datetime', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.events?.[0].event_datetime).toBe("2024-07-02 14:21:47");
    });

    test('Check Events[0].event_code', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.events?.[0].event_code).toBe("AAY");
    });

    test('Check Events[0].status_code', async () => {
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.tracking_info.events?.[0].status_code).toBe(StandardizedStatusCodes.InTransit);
    });

    test('cehck Metadat', async() => {
        //Arrange
        const metadata =  {
            api_key: "Apikey",
        }
        
        //Act
        const result = await Track(trackingRequest);

        //Assert
        expect(result.metadata).toStrictEqual(metadata);

    })
});
