import { RegistrationFormSchema } from '../../../src/definitions/forms/registration-form';

describe('check registration form Structure', () => {
    test('Check title', () => {
        //Act
        const result = RegistrationFormSchema.JsonSchema.title;

        //Assert
        expect(result).toBe('Connect The Pro Carrier');
    });

    test('Check type', () => {
        //Act
        const result = RegistrationFormSchema.JsonSchema.type;

        //Assert
        expect(result).toBe('object');
    });

    test('Check Required Properties', () => {
        //Arrange
        const expected = ["api_key"];
        //Act
        const result = RegistrationFormSchema.JsonSchema.required;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check Properties', () => {
        //Arrange
        const expected = {
            api_key: {
                type: "string",
                title: "Api Key"
            }
        };

        //Act
        const result = RegistrationFormSchema.JsonSchema.properties;

        //Assert
        expect(result).toStrictEqual(expected);
    });

    test('Check uiSchema', () => {
        //Arrange
        const expected = {
            "ui:order":["api_key"],
            api_key: {
                "ui:autofocus": true,
                "ui:help": "The api-key provided by carrier."
            }
        
        }
        
        //Act
        const result = RegistrationFormSchema.UiSchema;

        //Assert
        expect(result).toStrictEqual(expected);
    });
})