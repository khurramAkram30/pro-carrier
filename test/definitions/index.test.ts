import { proCarrier } from "../../src/definitions/pro-carrier";
import { Metadata } from "../../src/definitions/index";

describe('Check metadata', () => {
    test('Check Id', () => {
        //Assert
        expect(Metadata.Id).toBe('d0eab36d-3e0a-43a7-b304-54ec82e8cb61');
    });

    test('Check Name', () => {
        //Assert
        expect(Metadata.Name).toBe('ProCarrier');
    });

    test('Check Carriers', () => {
        //Assert
        expect(Metadata.Carriers).toStrictEqual([proCarrier]);
    });
});

