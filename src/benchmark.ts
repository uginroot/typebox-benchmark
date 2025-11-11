import {Type} from 'typebox';
import {Compile, Validator} from 'typebox/compile';
import {Value, Pipeline, DecodeUnsafe, Assert} from 'typebox/value';

type Test = {
    name: string;
    schemaWithCodec: Type.TSchema;
    schemaWithoutCodec: Type.TSchema;
    validatorWithCodec: Validator;
    validatorWithoutCodec: Validator;
    testData: object;
}

const iterations = 100_000;

const tests: Test[] = [
    (() => {
        const schemaWithCodec = Type.Object({
            name: Type.Codec(Type.String())
                .Decode((value) => value)
                .Encode((value) => value),
        });
        const schemaWithoutCodec = Type.Object({
            name: Type.String(),
        });
        return {
            name: 'Small Object',
            schemaWithCodec,
            schemaWithoutCodec,
            validatorWithCodec: Compile(schemaWithCodec),
            validatorWithoutCodec: Compile(schemaWithoutCodec),
            testData: {
                name: 'John Doe',
            },
        }
    })(),
    (() => {
        const schemaWithCodec = Type.Object({
            type: Type.Literal("FE.WidgetCustomizationResolved"),
            source: Type.String(),
            headers: Type.Object({
                dateTime: Type.Codec(Type.String({ format: "date-time" })).
                    Decode((value: string) => value).
                    Encode((value: string) => value),
                userAgent: Type.String(),
                location: Type.String(),
                app: Type.String(),
                shopId: Type.Number(),
                sessionToken: Type.Union([Type.String(), Type.Null()]),
                customerId: Type.Union([Type.Number(), Type.Null()]),
                ipAddress: Type.Union([Type.String({ format: "ipv4" }), Type.String({ format: "ipv6" })])
            }),
            payload: Type.Object({
                widgetName: Type.String()
            })
        });
        const schemaWithoutCodec = Type.Object({
            type: Type.Literal("FE.WidgetCustomizationResolved"),
            source: Type.String(),
            headers: Type.Object({
                dateTime: Type.String({ format: "date-time" }),
                userAgent: Type.String(),
                location: Type.String(),
                app: Type.String(),
                shopId: Type.Number(),
                sessionToken: Type.Union([Type.String(), Type.Null()]),
                customerId: Type.Union([Type.Number(), Type.Null()]),
                ipAddress: Type.Union([Type.String({ format: "ipv4" }), Type.String({ format: "ipv6" })])
            }),
            payload: Type.Object({
                widgetName: Type.String()
            })
        });
        return {
            name: 'Big Object',
            schemaWithCodec: schemaWithCodec,
            schemaWithoutCodec: schemaWithoutCodec,
            validatorWithCodec: Compile(schemaWithCodec),
            validatorWithoutCodec: Compile(schemaWithoutCodec),
            testData: {
                "type": "FE.WidgetCustomizationResolved",
                "source": "frontend-app",
                "headers": {
                    "dateTime": "2025-10-10T12:00:00Z",
                    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "location": "https://example.com/shop",
                    "app": "default",
                    "shopId": 12345,
                    "sessionToken": "abc123xyz",
                    "customerId": 67890,
                    "ipAddress": "192.168.1.1"
                },
                "payload": {
                    "widgetName": "product-carousel"
                }
            },
        }
    })(),
];


function benchmark(name: string, fn: () => void): { name: string; "duration (ms)": number; "ops/sec": number } {
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
        fn();
    }

    const end = performance.now();
    const duration = end - start;
    const opsSec = Math.round((iterations / duration) * 1000);

    return { name, "duration (ms)": Number(duration.toFixed(2)), "ops/sec": opsSec };
}

const CustomDecoder = Pipeline([
    // tip: replace Assert with Compiled Type Assert for even faster performance.
    (context, type, value) => { Assert(context, type, value); return value },
    (context, type, value) => DecodeUnsafe(context, type, value)
])

function runTest(test: Test) {
    console.log(`\nBenchmarking test: ${test.name}`);
    console.table([
        benchmark("Compile check without codec", () => test.validatorWithoutCodec.Check(test.testData)),
        benchmark("Compile check with codec", () => test.validatorWithCodec.Check(test.testData)),
        benchmark("Compile decode without codec", () => test.validatorWithoutCodec.Decode(test.testData)),
        benchmark("Compile decode with codec", () => test.validatorWithCodec.Decode(test.testData)),
        benchmark("Value.Check check without codec", () => Value.Check(test.schemaWithoutCodec, test.testData)),
        benchmark("Value.Check check with codec", () => Value.Check(test.schemaWithCodec, test.testData)),
        benchmark("CustomDecoder decode without codec", () => CustomDecoder(test.schemaWithoutCodec, test.testData)),
        benchmark("CustomDecoder decode with codec", () => CustomDecoder(test.schemaWithCodec, test.testData)),
    ]);
}

for (const test of tests) {
    runTest(test);
}

