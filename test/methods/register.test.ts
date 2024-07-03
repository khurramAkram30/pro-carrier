import { InternalReqRegister } from '../../src/helpers/internal-models';
import { RegisterRequest } from '@shipengine/connect-carrier-api';
import { Register } from '../../src/methods/register/register';

jest.mock('../../src/api/api-communicator');

let registerRequest: RegisterRequest;
let registration_info : InternalReqRegister

beforeEach(() => {
    registration_info = {
        api_key:"apiKey"
    };
    registerRequest ={ 
        transaction_id: "",
        registration_info: registration_info
    }
});


