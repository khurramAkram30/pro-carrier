import { CreateLabel } from '../../src/methods/create-label/create-label';
import { InternalReqRegister } from '../../src/helpers/internal-models';
import { AddressResidentialIndicator, CreateLabelRequest, Currency, CustomsContentTypes, DimensionUnit, DocumentFormat, LabelLayouts, TaxIdentifierType, WeightUnit } from '@shipengine/connect-carrier-api';
import { TermsOfTradeCode } from '@shipengine/connect-carrier-api/lib/models/inconterms/terms-of-trade-code';
import { SERVICE_API_CODES } from '../../src/helpers/constants';
import { ValidateWeight, getMaximumWeight } from '../../src/methods/create-label/validate';

jest.mock('../../src/api/api-communicator');

let createLabelRequest: CreateLabelRequest;
let metadata: InternalReqRegister;

beforeEach(() => {
    metadata = {
        api_key: "Apikey"
    };
    createLabelRequest = {
        transaction_id: "asd-123",
        label_format: DocumentFormat.Pdf,
        label_layout: LabelLayouts.FourBySix,
        metadata,
        packages: [
            {
                content_description: "Important Goods",
                customs: {
                    buyer_shipping_amount_paid: {
                        amount: "1.00",
                        currency: "USD"
                    },
                    contents: CustomsContentTypes.Other,
                    contents_explanation: "",
                    customs_items: [
                        {
                            country_of_origin: "GB",
                            description: "Books",
                            harmonized_tariff_code: "6403190211",
                            item_weight: {
                                source_weight: 2,
                                source_weight_unit: WeightUnit.Kilograms,
                                weight_in_grams: 7000,
                                weight_in_ounces: 246.918
                            },
                            mid_code: "",
                            product_url: "test.html",
                            quantity: 4,
                            sku: "12312",
                            sku_description: "",
                            value: {
                                amount: "100.00",
                                currency: "USD"
                            },
                            vat_rate: 10
                        },
                        {
                            country_of_origin: "GB",
                            description: "Register",
                            harmonized_tariff_code: "6403190213",
                            item_weight: {
                                source_weight: 2,
                                source_weight_unit: WeightUnit.Kilograms,
                                weight_in_grams: 7000,
                                weight_in_ounces: 246.918
                            },
                            mid_code: "",
                            product_url: "test.html",
                            quantity: 1,
                            sku: "12311",
                            sku_description: "",
                            value: {
                                amount: "200.00",
                                currency: "USD"
                            },
                            vat_rate: 20
                        }
                    ],
                    declaration: "",
                    duties_paid: {
                        currency: "",
                        amount: ""
                    },
                    export_declaration_number: "",
                    importer_of_record: {
                        address_line1: "",
                        address_line2: "",
                        city_locality: "",
                        company_name: "",
                        country_code: "",
                        email: "",
                        name: "",
                        phone: "",
                        postal_code: "",
                        state_province: "",
                        tax_identifiers: []
                    },
                    terms_of_trade_code: TermsOfTradeCode.DDP
                },
                dimension_details: {
                    dimensions_in_centimeters: {
                        height: 12,
                        length: 25,
                        width: 22
                    },
                    dimensions_in_inches: {
                        height: 5,
                        length: 10,
                        width: 9
                    },
                    source_dimension_unit: DimensionUnit.Inches,
                    source_dimensions: {
                        height: 5,
                        length: 10,
                        width: 9
                    }
                },
                insured_value: {
                    amount: "0.0",
                    currency: "USD"
                },
                label_messages: {
                    reference1: "",
                    reference2: "",
                    reference3: ""
                },
                products: [
                    {
                        country_of_origin: "",
                        dangerous_goods: [],
                        description: "Crockery",
                        harmonized_tariff_code: "",
                        item_weight: {
                            source_weight: 2,
                            source_weight_unit: WeightUnit.Kilograms,
                            weight_in_grams: 7000,
                            weight_in_ounces: 246.918
                        },
                        mid_code: "",
                        product_url: "",
                        quantity: 1,
                        sku: "",
                        sku_description: "",
                        value: {
                            amount: "100.00",
                            currency: "USD"
                        },
                    },
                ],
                weight_details: {
                    source_weight: 2,
                    source_weight_unit: WeightUnit.Kilograms,
                    weight_in_grams: 7000,
                    weight_in_ounces: 246.918
                }
            }
        ],
        service_code: "PCPE",
        ship_to: {
            tax_identifiers: [
                {
                    id: "76866",
                    type: TaxIdentifierType.VAT,
                    registration_country: "ES",
                    description: "VAT ES: 76866"
                }
            ],
            name: "Edward RM6",
            first_name: "Edward",
            last_name: "RM6",
            email: "khurram.akram43@gmail.com",
            phone_number: "+441534880588",
            company_name: "Bohemia Bar",
            address_residential_indicator: AddressResidentialIndicator.Unknown,
            is_eu: true,
            instructions: "",
            address_metadata: {},
            address_lines: [
                "C. de la Torrecilla del Leal",
                "12",

            ],
            city_locality: "Madrid",
            state_province: "Madrid",
            postal_code: "28012",
            country_code: "ES"
        },
        ship_from: {
            tax_identifiers: [
                {
                    id: "69655",
                    type: TaxIdentifierType.VAT,
                    registration_country: "GB",
                    description: "VAT GB: 69655"
                },
                {
                    id: "44567",
                    type: TaxIdentifierType.IOSS,
                    registration_country: "GB",
                    description: "IOSS GB: 44567"
                },
                {
                    id: "44567",
                    type: TaxIdentifierType.EORI,
                    registration_country: "GB",
                    description: "IOSS GB: 44567"
                }
            ],
            name: "David Beckham",
            first_name: "David",
            last_name: "Beckham",
            email: "khurram.akram39@gmail.com",
            phone_number: "+44387681200",
            company_name: "Old Trafford",
            address_residential_indicator: AddressResidentialIndicator.No,
            is_eu: false,
            instructions: "",
            address_metadata: {},
            address_lines: [
                "29 Ayres Rd",
                "Old Trafford",

            ],
            city_locality: "Manchester",
            state_province: "Manchester",
            postal_code: "M16 9WA",
            country_code: "GB"
        },
        is_return_label: true,
        advanced_options: {},
        ship_datetime: "",
    }

});

describe('unit test for createLabel method Validations', () => {
    test('Package is not greater than 1', async () => {
        //Arrange
        createLabelRequest.packages.push(
            {
                insured_value: {
                    amount: "",
                    currency: ""
                },
            }
        );
        //Act
        const result = await CreateLabel(createLabelRequest).catch(e => e);
        //Assert
        expect(result.message).toBe('multipackage not supported');
    });

    test('Service Code = PCPL & terms_of_trade_code != DDP', async () => {
        //Arrange
        createLabelRequest.service_code = SERVICE_API_CODES.ProCarrierParcelPlus;
        createLabelRequest.packages[0].customs!.terms_of_trade_code = TermsOfTradeCode.DDU;
        //Act
        const result = await CreateLabel(createLabelRequest).catch(e => e);
        //Assert
        expect(result.message).toBe('Only DDP is allowed');

    });

    test('packages[0].customs!.terms_of_trade_code != DDP && packages[0].customs!.terms_of_trade_code != DDU', async () => {
        //Arrange
        createLabelRequest.packages[0].customs!.terms_of_trade_code = TermsOfTradeCode.CIF;
        //Act
        const result = await CreateLabel(createLabelRequest).catch(e => e);
        //Assert
        expect(result.message).toBe('Only DDP and DDU are valid for terms of trade code');

    });

    test('Ship_from.Country Code is mandatory', async () => {
        //Arrange
        createLabelRequest.ship_from.country_code = "";
        //Act
        const result = await CreateLabel(createLabelRequest).catch(e => e);
        //Assert
        expect(result.message).toBe('ShipFrom.Countrycode: It is mandatory');

    });

    test('Custom item amount must be positive value', async () => {
        createLabelRequest.packages[0].customs?.customs_items.map(async (items) => {
            //Arrange
            items.value!.amount = "-1";
            //Act
            const result = await CreateLabel(createLabelRequest).catch(e => e);
            //Assert
            expect(result.message).toBe('Custom items amount must be positive integer');
        });
    });

    test('Weight Limit Exceed', async () => {
        //Arrange
        const sourceWeight = createLabelRequest.packages[0].weight_details!.source_weight = 1000;
        const sourceWeightUnit = createLabelRequest.packages[0].weight_details!.source_weight_unit = WeightUnit.Kilograms;
     
        //Act
        const result = await CreateLabel(createLabelRequest).catch(e => e);
        //Assert
        expect(result.message).toBe('Exceed Weight Limit');
    });
});

describe('Check createLabel Response Mapping', () => { 
    test('check tracking number', () => { 
        
    })
});
