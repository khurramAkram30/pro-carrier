import { SettingsFormSchema } from '../../../src/definitions/forms/setting-form';


describe('check registration form Structure', () => {
    test('Check title', () => {
        //Act
        const result = SettingsFormSchema.JsonSchema.title;

        //Assert
        expect(result).toBe('Update The Pro Carrier');
    });

    test('Check type', () => {
        //Act
        const result = SettingsFormSchema.JsonSchema.type;

        //Assert
        expect(result).toBe('object');
    });

    test('Check Required Properties', () => {
        //Arrange
        const expected = ["api_key"];
        //Act
        const result = SettingsFormSchema.JsonSchema.required;

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
        const result = SettingsFormSchema.JsonSchema.properties;

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
        const result = SettingsFormSchema.UiSchema;

        //Assert
        expect(result).toStrictEqual(expected);
    });
})