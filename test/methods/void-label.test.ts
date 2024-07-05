import { VoidLabelsRequest } from "@shipengine/connect-carrier-api";
import { VoidLabels } from '../../src/methods/void-label/void-label';

jest.mock('../../src/api/api-communicator');

let voidLabelRequest: VoidLabelsRequest;

beforeEach(() => {
    voidLabelRequest = {
        void_requests: [
            {
                void_request_id: "be1c8d79-5406-4995-a114-6ec0b9dced3c",
                tracking_number: "DG30561009729",
                ship_from: {
                    postal_code: '',
                    country_code: ''
                }
            },

        ],
        transaction_id: "void label 123",
        "metadata": {
            "api_key": "Apikey"
        }
    }
})

describe('unit test for void label method', () => {
    test('tracking number is not provided', async () => {
        //Arrange 
        voidLabelRequest.void_requests[0].tracking_number = "";
        //Act 
        const result = await VoidLabels(voidLabelRequest).catch(e => e);

        //Assert
        expect(result.void_responses[0].errors[0]).toBe('Invalid request - TrackingNumber or ShipperReference required')
    });

    test('tracking number is invalid', async () => {
        //Arrange 
        voidLabelRequest.void_requests[0].tracking_number = "invlid";
        //Act 
        const result = await VoidLabels(voidLabelRequest).catch(e => e);

        //Assert
        expect(result.void_responses[0].errors[0]).toBe('Shipment not found (invalid)')
    });

    test('tracking number is valid', async () => {
        //Act 
        const result = await VoidLabels(voidLabelRequest);

        //Assert
        expect(result.void_responses[0].message).toBe('Label voided successfully')
    });

    test('check metadata', async() => {
        const metadata =  {
            api_key: "Apikey",
        }
        
        //Act
        const result = await VoidLabels(voidLabelRequest);

        //Assert
        expect(result.metadata).toStrictEqual(metadata);

    })
});