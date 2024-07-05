import { InternalReqRegister } from '../../src/helpers/internal-models';
import { RegisterRequest } from '@shipengine/connect-carrier-api';
import { Register } from '../../src/methods/register/register';

jest.mock('../../src/api/api-communicator');

let registerRequest: RegisterRequest;
let registration_info : InternalReqRegister;

beforeEach(() => {
    registration_info = {
        api_key:"Apikey"
    };
    registerRequest = { 
        transaction_id: "d0eab36d-3e0a-43a7-b304-54ec82e8cb90",
        registration_info: registration_info
    }
});

describe('Unit test for Register method', () => {
    test('Should Through error when api key is not provided', async() => {
        //Arrange
        delete registration_info.api_key;

        //Act
        const result = await Register(registerRequest).catch(e => e);
        //Assert
        expect(result.message).toBe('Api Key Required');
    })

    test.each([['WrongAPi']])('Should through error when api key is invalid', async(Apikey) => {
        //Arrange
        const expected = registerRequest.registration_info['api_key'] = Apikey 

        //Act
        const result = await Register(registerRequest).catch(e => e);

        //Assert
        expect(result.message).toBe('Error from Carrier Api: Error Code: 10 , Error Message: Access Denied');
    });

    test.each([['Apikey']])('Should not through error when api key is valid', async(Apikey) => {
        //Arrange
        const expected = registerRequest.registration_info['api_key'] = Apikey 

        //Act
        const result = await Register(registerRequest).catch(e => e);

        //Assert
        expect(result.message).toBe(undefined);
    });

    test('Check metadata', async () => {
        //Arrange
        const expected = {
            api_key:"Apikey"
        };

        //Act
        const result = (await Register(registerRequest)).metadata;

        //Assert
        expect(result).toStrictEqual(expected);
    });
});

